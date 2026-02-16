import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: seconds(10), // 10 seconds
          limit: 3, // 3 requests
        },
        {
          name: 'medium',
          ttl: seconds(30), // 30 seconds
          limit: 5, // 5 requests
        },
        {
          name: 'long',
          ttl: seconds(60), // 1 minute
          limit: 10, // 10 requests
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
