import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60), // 1 minute
          limit: 10, // 10 requests
          blockDuration: seconds(10), // 10 seconds: After 10 requests, the user will be blocked for 10 seconds. If no provided then ttl is used as block duration.
        },
      ],
      errorMessage: 'WOW Man! Slow down. You are making too many requests. Please try again later',
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
