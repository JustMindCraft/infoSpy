import getBrowserGun from "../gunDB/browser";

export async function getPostBodyById(id, cb){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
    return await RootNode.get("post_bodys/"+id);
}

export function putPostBody(id, body, cb){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
    return RootNode.get("post_bodys/"+id).put(body, (ack)=>{
        return cb(ack.ok, ack.err);
    })
}

