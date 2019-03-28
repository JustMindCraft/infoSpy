const { RootNode, now } = require("../gunDB");

async function getPostBodyById(id, cb){
    return await RootNode.get("post_bodys/"+id);
}

function putPostBody(id, body, cb){
    return RootNode.get("post_bodys/"+id).put(body, (ack)=>{
        return cb(ack.ok, ack.err);
    })
}

module.exports = {
    getPostBodyById,
    putPostBody
}