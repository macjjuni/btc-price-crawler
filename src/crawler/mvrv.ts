/* eslint-disable prettier/prettier */
import puppeteer from 'puppeteer-extra';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
import { addExtra } from 'puppeteer-extra';
import { IMvrvVal } from 'src/mvrv/mvrv.model';

const puppeteerExtra = addExtra(puppeteer);
puppeteer.use(StealthPlugin());

const clip = { x: 20, y: 230, width: 920, height: 470 };
const crawlUrl = process.env.MVRV || '';

interface IReturnMvrv {
  src: string;
  mvrv: IMvrvVal;
}

const mvrvCrawler = async (): Promise<IReturnMvrv> => {
  const mvrvVal: IMvrvVal = {
    val: '',
    date: '',
  };

  const browser = await puppeteerExtra.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    ignoreHTTPSErrors: true,
  });
  try {
    if (crawlUrl === '') throw Error('Not Found Crawl Url');
    const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 900 });

    await page.goto(crawlUrl);
    await page.waitForSelector('.chart-wrapper'); // 차트로딩 대기

    // MVRV Z-Score 크롤링
    const mvrvValEle = await page.$(
      '.sidebar-sec.chart-stat-lastrows > ul > li > .stat-val > .val',
    );
    const mvrvDateEle = await page.$(
      '.sidebar-sec.chart-stat-lastrows > ul > li > .date-label',
    );
    if (mvrvValEle && mvrvDateEle) {
      const mvrvValue = await page.evaluate((el) => el.textContent, mvrvValEle);
      const mvrvDate = await page.evaluate((el) => el.textContent, mvrvDateEle);
      mvrvVal.val = mvrvValue;
      mvrvVal.date = mvrvDate;
    } else {
      mvrvVal.val = 'not found';
      mvrvVal.date = 'not found';
    }
    await page.waitForTimeout(500); // 차트 애니메이션 대기

    const screenshot = await page.screenshot({ clip: clip });
    const webpBuffer = await sharp(screenshot)
      .toFormat('webp')
      .toBuffer()
      .then((webpBuffer) => webpBuffer)
      .catch((err) => {
        console.error(err);
        return {
          src: 'error',
          mvrv: mvrvVal,
        };
      });

    return {
      src: webpBuffer.toString('base64'),
      mvrv: mvrvVal,
    };
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
};

export default mvrvCrawler;
