import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  NotFoundException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserCommand } from '../../application/create-user.command';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from '../../domain/auth.enum';
import { AppService } from '../../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/not-found-exception')
  getHttpException(): never {
    throw new NotFoundException(new Error('Recurso no encontrado'), 'Not Found');
  }

  @Get('/forbidden-exception')
  getForbiddenException(): never {
    throw new ForbiddenException();
  }

  @Get('/secured')
  @UseGuards(AuthGuard(AuthStrategiesEnum.JWT))
  getSecured(): string {
    return 'Secured endpoint';
  }

  @Get('/nil')
  getNil(): null {
    return null;
  }

  @Get('/undef')
  getUndef(): undefined {
    return undefined;
  }

  @Post()
  create(@Body() createUserDto: CreateUserCommand): CreateUserCommand {
    return createUserDto;
  }
}
