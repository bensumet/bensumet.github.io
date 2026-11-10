const { chromium } = require('playwright');
const sizes = { 'policy-search': [1548, 668], 'policy-overview': [1548, 668], 'policy-property-grid': [1548, 668], 'design-upload-match-2020': [1600, 900] };
(async () => {
  const b = await chromium.launch();
  for (const n of process.argv.slice(2)) {
    const [w, h] = sizes[n];
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto('file://' + __dirname + '/' + n + '.html');
    const sc = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]);
    await p.screenshot({ path: __dirname + '/out/' + n + '.jpg', type: 'jpeg', quality: 86 });
    console.log(n, sc); await p.close();
  }
  await b.close();
})();
