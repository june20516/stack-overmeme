import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, params, body } = request;
    const userAgent = request.get('user-agent') || '';
    this.logger.log(
    ['url','method','baseUrl','originalUrl','_parsedUrl','params','query','body'].map((key) => {
      return `${key} :: ${(typeof request[key] == 'string') ? request[key] : JSON.stringify(request[key])}\n`
    })
        // `req ~ [${method}] ${url} - \n parameters: ${JSON.stringify(Object.assign({}, params, body))}`
        // `req ~ [${method}] ${request.path} - \n parameters: ${JSON.stringify(body)}`
    )

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `~ res [${statusCode}] ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}