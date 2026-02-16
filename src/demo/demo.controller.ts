import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';
import { seconds, SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('demo')
export class DemoController {
    
    constructor(private readonly demoService: DemoService) {}

    @Get()
    getDemo() {
        return this.demoService.getDemo();
    }

    @Throttle({ default: { limit: 1, ttl: seconds(10) } }) // Override the throttling for this route, 1 request per 10 seconds
    @Get('big')
    getBigDemo() {
        return this.demoService.getBigDemo();
    }
}
