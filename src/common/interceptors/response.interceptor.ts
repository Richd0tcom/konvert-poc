import { EXCLUDE_RESPONSE_INTERCEPTOR } from '@common/decorators/exclude-response.decorator';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const excludeInterceptor = this.reflector.get<boolean>(
      EXCLUDE_RESPONSE_INTERCEPTOR,
      context.getHandler(),
    );

    if (excludeInterceptor) {
      return next.handle();
    }
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data,
                message: 'Request successful',
            })),
            catchError((err) => {
                const status =
                    err?.status ||
                    err?.response?.statusCode ||
                    HttpStatus.INTERNAL_SERVER_ERROR;
                const message =
                    err?.response?.message ||
                    err?.message ||
                    'An unexpected error occurred';
                throw new HttpException(
                    {
                        success: false,
                        data: null,
                        message,
                    },
                    status,
                );
            }),
        );
    }
}