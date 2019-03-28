const { RootNode, now }  = require("../gunDB/index.js");

async function createTag(tagName, cb){
    //创建一个标签
    const uuid = require("uuid/v4")();
    RootNode.get("tags/"+tagName).once( async (data,key)=>{
        
        if(data === 1){
            return cb(tagName+" EXSIT", null);
        }else{
            const tagOne = RootNode.get("tags/"+uuid)
            .put({name: tagName, createdAt: now(), id: uuid, updatedAt: now()});
            await RootNode.get("tags/"+tagName).put(1);
            return await RootNode.get("tags").set(tagOne, ack=>{
                return cb(ack.ok, ack.err);
            });
        }
    })
   
}


async function updateTag(id, tagName){
    const tagOne = await  RootNode.get("tags/"+id)
            .put({name: tagName, id: uuid}).get("updatedAt").put(now());
    await RootNode.get("tags/"+tagName).put(true);
    return RootNode.get("tags").set(tagOne, ack=>{
        return cb(ack.ok, ack.err);
    });
}




function getTags(conditon, cb){
    return RootNode.get("tags").map(conditon).once((data,key)=>{
        if(!data){
            return false;
        }
        cb(data,key);
    })
}

function getTagsByPostId(postId, cb){
    RootNode.get("post_tag/"+postId).once((data, key)=>{

        cb(data.tag, key);
    })
}


module.exports = {
    createTag,
    getTags,
    getTagsByPostId,
    updateTag
}