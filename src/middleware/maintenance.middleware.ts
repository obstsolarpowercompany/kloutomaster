import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isDown = process.env.MAINTENANCE_MODE === 'true';

    if (isDown) {
      return res.status(503).json({ error: 'Service temporarily unavailable' });
    }

    next();
  }
}
