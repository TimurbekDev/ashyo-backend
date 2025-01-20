import { UseInterceptors } from '@nestjs/common';
import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisCacheService } from 'src/redis/redis.service';




@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(private readonly redisCacheService: RedisCacheService, private readonly ttl: number) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const url = request.url;

        const cachedData = await this.redisCacheService.getByUrl(url);
        if (cachedData) {
            return of(JSON.parse(cachedData));
        }

        return next.handle().pipe(
            tap(async (response) => {
                await this.redisCacheService.setByUrl(url, JSON.stringify(response), this.ttl);
            }),
        );
    }
}


export function CacheByUrl(ttl: number = 3600) {
    return UseInterceptors(new CacheInterceptor(new RedisCacheService(), ttl));
}
