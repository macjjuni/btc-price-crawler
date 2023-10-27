import { Module } from '@nestjs/common';
import { MvrvController } from './mvrv.controller';
import { MvrvService } from './mvrv.service';

@Module({
  controllers: [MvrvController],
  providers: [MvrvService],
})
export class MvrvModule {}
