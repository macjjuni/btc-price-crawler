import { Module } from '@nestjs/common';
import { MvrvModule } from './mvrv/mvrv.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [MvrvModule, TestModule],
  controllers: [TestController],
  providers: [TestService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
