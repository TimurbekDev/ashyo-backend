import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

export declare interface ISetText {
  key: string,
  value: number | string,
  time?: number
}

@Injectable()
export class RedisCacheService {

  constructor(
    @InjectRedis() private client : Redis
  ){}

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.client.expire(key, ttl);
  }

  async setByText(payload: ISetText): Promise<void> {
    await this.client.set(payload.key, payload.value, 'EX', payload.time);
  }

  async getByText(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async deleteByText(key: string): Promise<void> {
    await this.client.del(key);
  }

}
