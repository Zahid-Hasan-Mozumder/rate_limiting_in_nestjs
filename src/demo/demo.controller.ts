import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('demo')
export class DemoController {
    
    constructor(private readonly demoService: DemoService) {}

    @Get()
    getDemo() {
        return this.demoService.getDemo();
    }

    @SkipThrottle() // This route will be skipped by the throttler
    @Get('big')
    getBigDemo() {
        return this.demoService.getBigDemo();
    }
}
