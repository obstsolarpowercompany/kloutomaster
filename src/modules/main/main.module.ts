import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import authConfig from '../../config/auth.config';
import serverConfig from '../../config/server.config';
import dataSource from '../../scripts/data-source';
import HealthController from './infrastructure/controllers/health.controller';
import ProbeController from './infrastructure/controllers/probe.controller';
import { AuthGuard } from '../auth/infrastructure/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { MailingModule } from '../mailing/mailing.module';
import { UserModule } from '../user/user.module';
import { FollowingModule } from '../following/following.module';
import { PaymentModule } from '../payment/payment.module';
import { MaintenanceInterceptor } from './infrastructure/maintenance.interceptor';
import { configSchema } from '../../config/schemas/config.schema';


@Module({
  providers: [
    {
      provide: 'CONFIG',
      useClass: ConfigService,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MaintenanceInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true,
      load: [serverConfig, authConfig],
      validationSchema: configSchema,
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => dataSource,
    }),
    AuthModule,
    MailingModule,
    UserModule,
    MailingModule,
    FollowingModule,
    PaymentModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [HealthController, ProbeController],
})
export class AppModule { }
