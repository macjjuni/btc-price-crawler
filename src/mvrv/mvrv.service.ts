import { Injectable } from '@nestjs/common';
import { IMvrv } from './mvrv.model';
import mvrvCrawler from 'src/crawler/mvrv';

@Injectable()
export class MvrvService {
  private mvrvData: IMvrv = {
    src: '',
    date: null,
  };

  async getMvrvData() {
    (this.mvrvData.src = await mvrvCrawler()),
      (this.mvrvData.date = new Date());
  }

  async getMvrv() {
    await this.getMvrvData();
    return this.mvrvData;
  }
}
