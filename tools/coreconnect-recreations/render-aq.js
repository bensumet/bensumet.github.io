// usage: node render-aq.js name width height [query] [outname]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [name, w, h, query = '', outname] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, name + '.html') + query);
  await page.waitForTimeout(150);
  const sb = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]);
  if (sb[0] > +w || sb[1] > +h) console.log('WARN overflow', sb);
  await page.screenshot({ path: path.join(__dirname, 'out', (outname || name) + '.jpg'), type: 'jpeg', quality: 86 });
  await browser.close();
  console.log('ok', outname || name);
})();
