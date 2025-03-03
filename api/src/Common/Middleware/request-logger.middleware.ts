import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {method, originalUrl} = req;
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${method} - ${originalUrl}`);
    next();
  }
}
