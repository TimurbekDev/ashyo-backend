import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const requestTime = new Date().toISOString();

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            let statusCode = 400;
            let message = 'Prisma client request error';

            switch (exception.code) {
                case 'P2002':
                    message =
                        'Unique constraint failed: one or more fields must be unique';
                    break;
                case 'P2025':
                    message = 'Record not found: the requested resource does not exist';
                    statusCode = 404;
                    break;
                case 'P2003':
                    message =
                        'Foreign key constraint failed: related record does not exist';
                    break;
                default:
                    message = exception.message;
            }

            return response.status(statusCode).json({
                statusCode,
                message,
                errorName: 'PrismaClientKnownRequestError',
                code: exception.code,
                meta: exception.meta,
                requestTime,
                url: request.url,
            });
        }

        if (exception instanceof HttpException) {
            return response.status(exception.getStatus()).json({
                statusCode: exception.getStatus(),
                message: exception.message,
                errorName: exception.name,
                requestTime,
                url: request.url,
            });
        }

        return response.status(500).json({
            statusCode: 500,
            message: exception?.message || 'Internal server error',
            errorName: exception?.name || 'UnknownError',
            requestTime,
            url: request.url,
        });
    }
}
