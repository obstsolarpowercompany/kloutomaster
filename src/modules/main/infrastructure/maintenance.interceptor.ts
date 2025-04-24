import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

import { Reflector } from '@nestjs/core';
import { FollowingService } from '../../following/application/following.service';

@Injectable()
export class MaintenanceInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const isMaintenanceRoute = request.url === '/api/v1/follower/followerfff';

    const isMaintenanceMode = FollowingService.getFollowingMode();

    if (isMaintenanceMode && !isMaintenanceRoute) {
      throw new HttpException(
        'Service temporarily unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return next.handle();
  }
}
