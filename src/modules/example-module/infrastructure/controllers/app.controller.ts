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

  @Get('/four-hundred-exception')
  getException(): never {
    throw new HttpException('Algun error ha ocurrido', 400);
  }

  @Get('/vanilla-exception')
  getError(): never {
    throw new Error('Algun error ha ocurrido');
  }

  @Get('/secured')
  @UseGuards(AuthGuard(AuthStrategiesEnum.JWT))
  getSecured(): string {
    return 'Secured endpoint';
  }

  @UseGuards(AuthGuard(AuthStrategiesEnum.API_KEY))
  @Get('/object')
  getObject(): Record<string, any> {
    return {
      name: 'jose elorza!',
    };
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
