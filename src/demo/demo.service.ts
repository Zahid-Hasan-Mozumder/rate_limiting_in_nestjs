import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
    getDemo() {
        return 'Hello from Zahid Hasan Mozumder';
    }
}
