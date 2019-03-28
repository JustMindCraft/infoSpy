const { RootNode } = require("../gunDB");
async function initClientState(){
    const currentClientId =  window.localStorage.getItem("spy_uuid");
    let  clientId = window.localStorage.getItem("spy_uuid");
    if(!currentClientId){
        clientId =  require('uuid/v4')();
        window.localStorage.setItem("spy_uuid", clientId);
    }
    if(clientId){
        await RootNode.get("client").get(clientId).get("load").put(true);
        await RootNode.get("client").get(clientId).get("upload").put(false);
    }
   
}

module.exports = {
    initClientState
}

