import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private test: TestService) {}

  @Get()
  startTest() {
    return this.test.test();
  }
}
