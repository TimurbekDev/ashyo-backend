import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });
  }

  async getByUrl(url: string): Promise<any | null> {
    const cachedData = await this.client.get(url);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async setByUrl(url: string, value: any, ttl: number): Promise<void> {
    await this.client.set(url, JSON.stringify(value), 'EX', ttl);
  }

  async deleteByUrl(url: string): Promise<void> {
    await this.client.del(url);
  }
}
