const { RootNode } = require("./index.js");



async function doCount(){
    let count = 0;
    RootNode.get("posts/index").map().once((data,key)=>{
        console.log(key, data);
        
    })
    // const posts_counts = await RootNode.get("posts_count");
    
}

doCount();

