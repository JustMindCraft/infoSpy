const { RootNode } = require("../gunDB");
async function initClientState(){
    RootNode.on((data,key)=>{
        console.log("connect");
        
    })
}

module.exports = {
    initClientState
}

