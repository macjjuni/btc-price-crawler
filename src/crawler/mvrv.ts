/* eslint-disable prettier/prettier */
import puppeteer from 'puppeteer-extra';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import { addExtra } from 'puppeteer-extra';
import sharp from 'sharp';

const puppeteerExtra = addExtra(puppeteer);
puppeteer.use(StealthPlugin());

const clip = { x: 31, y: 310, width: 1030, height: 575 };

const mvrvCrawler = async (): Promise<string> => {
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
    const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 900 });

    await page.goto('https://www.lookintobitcoin.com/charts/mvrv-zscore/');
    await page.waitForTimeout(2000);

    const screenshot = await page.screenshot({ clip: clip });
    const webpBuffer = await sharp(screenshot)
      .toFormat('webp')
      .toBuffer()
      .then((webpBuffer) => webpBuffer)
      .catch((err) => {
        console.error(err);
        return 'error';
      });
    return webpBuffer.toString('base64');
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
};

export default mvrvCrawler;
