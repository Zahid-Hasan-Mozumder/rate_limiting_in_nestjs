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

    @Get('big')
    getBigDemo() {
        return this.demoService.getBigDemo();
    }
}
