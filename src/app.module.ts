import { Module } from '@nestjs/common';
import { MvrvModule } from './mvrv/mvrv.module';

@Module({
  imports: [MvrvModule],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
