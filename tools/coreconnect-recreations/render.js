const {chromium}=require('playwright');
const sizes={'portal-hub':[1568,668],'policy-dashboard':[1548,668],'design-bimi-2019':[1600,765]};
(async()=>{const b=await chromium.launch();
for(const n of process.argv.slice(2)){const [w,h]=sizes[n];const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
await p.goto('file://'+__dirname+'/'+n+'.html');await p.screenshot({path:__dirname+'/out/'+n+'.jpg',type:'jpeg',quality:86});
const sc=await p.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.scrollHeight]);console.log(n,sc);await p.close();}
await b.close();})();
