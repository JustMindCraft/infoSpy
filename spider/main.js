import { createTag } from '../api/tags';
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',//如果在linux下面或者找不到chromium 就启用不然，注释掉这段。
        headless: true
    });

  const page = await browser.newPage();

  await page.goto('http://gank.io/api/today');

  const bodyHandle = await page.$('body pre');

  const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 

  const resouces = JSON.parse(resourcesHtml);

//   console.log(resouces);

  

  for (let index = 0; index < resouces["category"].length; index++) {

    const tags = resouces["category"][index];
    // const tags = element.category;
    tags.forEach(async tag => {
        await createTag(tag);
    });
    

    

    

  }

  

  browser.close();

})()