import { Controller, Get } from '@nestjs/common';
import { MvrvService } from './mvrv.service';
import { IMvrv } from './mvrv.model';

@Controller('/image/mvrv')
export class MvrvController {
  constructor(private mvrvService: MvrvService) {}

  @Get()
  async getMvrv(): Promise<IMvrv> {
    return await this.mvrvService.getMvrv();
  }
}
