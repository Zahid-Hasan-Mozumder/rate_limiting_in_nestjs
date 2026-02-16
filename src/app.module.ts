import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DemoModule } from './demo/demo.module';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60), // 60 seconds
          limit: 3, // 3 requests
        },
      ],
      errorMessage: 'WOW Man! Slow down. You are making too many requests. Please try again later',
      storage: new ThrottlerStorageRedisService({}), // Using Redis for throttling
    }),
    DemoModule,
  ],
  controllers: [],
  providers: [
    // Global configuration for the throttler
    // ThrottlerGuard is a guard that will be used to protect the routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
