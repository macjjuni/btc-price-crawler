import { Injectable } from '@nestjs/common';
import { IMvrv } from './mvrv.model';
import mvrvCrawler from 'src/crawler/mvrv';

@Injectable()
export class MvrvService {
  private mvrvData: IMvrv = {
    src: '',
    mvrv: {
      val: '',
      date: '',
    },
  };

  async getMvrvData() {
    const { src, mvrv } = await mvrvCrawler();
    this.mvrvData.src = src;
    this.mvrvData.mvrv = mvrv;
  }

  async getMvrv() {
    await this.getMvrvData();
    return this.mvrvData;
  }
}
