require("gun")
const puppeteer = require('puppeteer');
const { createTag, getTags } = require('../api/tags.js');
const { putPost } = require("../api/posts");
require('gun/lib/radix.js');
require('gun/lib/radisk.js');
require('gun/lib/store.js');
require('gun/lib/rindexed.js');

function judgeHost(url){
  //根据不同的网站进行不同的策略爬虫

}

(async () => {

  const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',//如果在linux下面或者找不到chromium 就启用不然，注释掉这段。
        headless: true
    });

  for (let index = 3; index <=200; index++) {
    console.log('===================================正在爬取第'+index+'页====================================================');
    
    let page = await browser.newPage();

    await page.goto('http://gank.io/api/data/all/48/'+index);
  
    const bodyHandle = await page.$('body pre');
  
    const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
    
    const resouces = JSON.parse(resourcesHtml);
  
    const results = resouces.results;
    // console.log(results);
    
    if(results){
      if(results.length===0){
        console.log('数据不存在,停止');
        await page.close();
        break;
      }else{
        console.log('数据存在,开始存入gundb');

      }
      for (let j = 0; j < results.length; j++) {
        if((index-1)*48+j+1<=172){
          continue;
        }
        
        console.log("获取了第"+((index-1)*48+j+1)+"条数据,开始准备文章数据");
        
        const post = {
          title: results[j].desc,
          tags: [results[j].type],
          cover: results[j].images? results[j].images[0] : "",
          who: results[j].who,
          isFrame: false,
          status: 'published'
        }
        if(results[j].type === "福利"){
          console.log("数据来源是福利", results[j]);
          
          post.body = `<img style="width: 100%;" src=${results[j].url} />`
          post.cover = results[j].url;
          post.tags = ["福利"];
          post.who = results[j].who;
          post.title = results[j].desc+"--美照"+(index-1)*48+j+1;
          post.id = require("uuid/v4")();
          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        console.log("============="+results[j].url+"=================");
        if(results[j].url.indexOf("github.com")>=0){
          console.log("数据来自github.com");
          try {
            await page.goto(results[j].url);
            await page.waitForNavigation({timeout:20000}).then(()=>{},async ()=>{
              console.log('网页加载失败!!!!!!!!!!!!!!!!!');
              

            });
            const bodyHandle = await page.$('.Box-body article');
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
           
          } catch (error) {
            console.error(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('.Box-body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            console.log(resourcesHtml);
            
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
            
          })
         
          
          
        }

        if(results[j].url.indexOf("jianshu.com")>=0){
          console.log('数据来自简书');
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .show-content');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .show-content');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
          
        }

        if(results[j].url.indexOf("ihtcboy.com")>=0){
          console.log("ihtcboy.com");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("zcfy.cc")>=0){
          console.log(results[j].desc, "数据来自zcfy.cc");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .markdown-body');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .markdown-body');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
          
        }
        if(results[j].url.indexOf("juejin.im")>=0){
          console.log("数据来自掘金");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('.article-area article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('.article-area article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("segmentfault.com")>=0){
          console.log("segmentfault.com");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body .article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("douyin.com")>=0){
          console.log(results[j].desc, "数据来自抖音");
          post.body = results[j].url;
          post.isFrame = true,
          console.log(results[j].url);
          post.id = require("uuid/v4")();
          
          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("skyseraph.com")>=0){
          console.log(results[j].desc, "数据来自skyseraph.com");
          console.log(results[j].url);
          
        }
        if(results[j].url.indexOf("developer.mozilla.org")>=0){
          console.log(results[j].desc, "数据来自developer.mozilla.org");
          console.log(results[j].url);
        }
        if(results[j].url.indexOf("blog.csdn.net")>=0){
          console.log(results[j].desc, "数据来自blog.csdn.net");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("zhuanlan.zhihu.com")>=0){
          console.log(results[j].desc, "数据来自zhuanlan.zhihu.com");
          try {
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          } catch (error) {
            console.warn(error);
            
            await page.goto(results[j].url);
  
            const bodyHandle = await page.$('body article');
          
            const resourcesHtml = await page.evaluate(body => body.innerHTML, bodyHandle); 
            post.body = (resourcesHtml+`<br/><br/>原文地址： <a href="${results[j].url}">${results[j].url}</a>`).toString();
            console.log({post});
          }
          post.id = require("uuid/v4")();

          await putPost(post, (rlt, err)=>{
            console.log(rlt);
            console.log(err);
            
          })
        }
        if(results[j].url.indexOf("weixin.qq.com")>=0){
          console.log(results[j].desc, "数据来自weixin.qq.com");
          console.log(results[j].url);
        }
        if(results[j].url.indexOf("realm.io")>=0){
          console.log(results[j].desc, "数据来自realm.io");
          console.log(results[j].url);
        }
        
        
        
      }
      await page.close();
      page = await browser.newPage();
      
    }else{
      console.log("爬虫被阻止，停止爬虫");
      await page.close();

      await browser.close();
      break;
    }
    
  }
  

  await browser.close();

 

  

  


})()