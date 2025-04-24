import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  Request,
  UseGuards,
  Res,
  StreamableFile,
  Header,
  ParseEnumPipe,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import { UpdateUserDocs, SoftDeleteUserDocs } from '../docs/user-swagger.doc';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UserPayload } from '../../domain/entities/interfaces/user-payload.interface';
import UserService from '../../application/user.service';
import { skipAuth } from '../../../../helpers/skipAuth';
import { UsersToDTO } from '../dto/user.mapper';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UpdateUserDocs()
  @Patch(':userId')
  async updateUser(
    @Request() req: { user: UserPayload },
    @Param('userId') userId: string,
    @Body() updatedUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updatedUserDto, req.user);
  }

  @skipAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAllUsers(
    @Query('cursor') cursor: number,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    const users = await this.userService.findAllUsers(cursor, limit);
    return UsersToDTO(users)
  }

  @Delete(':userId')
  @SoftDeleteUserDocs()
  async softDeleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req,
  ) {
    const authenticatedUserId = req['user'].id;

    return this.userService.softDeleteUser(userId, authenticatedUserId);
  }
}
