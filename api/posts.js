const { RootNode, now } = require("../gunDB");
const { putPostBody } = require("./post_body");
const { linkTagsToOnePost, lintPostsToOneTag } =  require("./post_tag");
const { createTag } =  require("./tags");


 async function  createPost(
    postParams={
        title: "未命名标题",
        body: "",
        tags: [],
        cover: "",
        who: "",
        isFrame: false,
        status: 'published'
    },
    cb
){
    const uuid = require("uuid/v4")();
    try {
        await RootNode.get("posts/"+uuid).get('title').put(postParams.title);
        await RootNode.get("posts/"+uuid).get('cover').put(postParams.cover);
        await RootNode.get("posts/"+uuid).get('createdAt').put(now());
        await RootNode.get("posts/"+uuid).get('updatedAt').put(now());
        await RootNode.get("posts/"+uuid).get('visited').put(0);
        await RootNode.get("posts/"+uuid).get('id').put(uuid);
        await RootNode.get("posts/"+uuid).get('who').put(postParams.who);
        await RootNode.get("posts/"+uuid).get('isFrame').put(postParams.isFrame);
        await RootNode.get("posts/"+uuid).get('status').put(postParams.status);
        await RootNode.get("posts").set(RootNode.get("posts/"+uuid))
    } catch (error) {
        cb(null, error);
    }
   
    await putPostBody(uuid, postParams.body, async (rlt, err)=>{
        if(rlt){
            await linkTagsToOnePost(uuid, postParams.tags);
            for (let index = 0; index < postParams.tags.length; index++) {
                const tag = postParams.tags[index];
                await createTag(tag, (rlt, err)=>{
                    console.log("创建标签情况", rlt, err);
                    
                });
                await lintPostsToOneTag(tag, [uuid]);
                
            }
            return cb(uuid, err);
        }
        if(err){
            return cb(false, err);
        }
    })
}

 async function updatePost(uuid,  postParams={
    title: "未命名标题",
    body: "",
    tags: [],
    cover: "",
},
cb){
    try {
        await RootNode.get("posts/"+uuid).get('title').put(postParams.title);
        await RootNode.get("posts/"+uuid).get('cover').put(postParams.cover);
        await RootNode.get("posts/"+uuid).get('createdAt').put(now());
        await RootNode.get("posts/"+uuid).get('updatedAt').put(now());
        await RootNode.get("posts/"+uuid).get('visited').put(0);
        await RootNode.get("posts/"+uuid).get('id').put(uuid);
        await RootNode.get("posts/"+uuid).get('who').put(postParams.who);
        await RootNode.get("posts/"+uuid).get('isFrame').put(postParams.isFrame);
        await RootNode.get("posts/"+uuid).get('status').put(postParams.status);
        await RootNode.get("posts").set(RootNode.get("posts/"+uuid));
    } catch (error) {
        cb(null, error);
    }
   
    await putPostBody(uuid, postParams.body, async (rlt, err)=>{
        if(rlt){
            await linkTagsToOnePost(uuid, postParams.tags);
            for (let index = 0; index < postParams.tags.length; index++) {
                const tag = postParams.tags[index];
                await createTag(tag);
                await lintPostsToOneTag(tag, [uuid]);
                
            }
            return cb(uuid, err);
        }
        if(err){
            return cb(false, err);
        }
    })
}

 async function addPostReadTimes(id,cb){
    return RootNode.get("posts/"+id).get('visited').once((data,key)=>{
        let visited = 0;

        if(data){
           visited = data;
        }
        return RootNode.get("posts/"+id).put({
            visited: visited+1,
        }, ack=>{
            RootNode.get("posts")
            .map(post=> post &&  post.id === id? post : undefined)
            .once((data,key)=>{
                RootNode.get("posts").get(key).get('visited').put(visited+1, ack=>{
                    return cb(ack.ok, ack.err);
                })
                
            })
            
        })
    })
}
 async function getPostReadTimes(id,cb){
    return RootNode.get("posts/"+id).get('visited').once((data,key)=>{
        return cb(data,key);
    })
}

 function getPosts(condition, cb){
    return RootNode.get("posts").map(condition).once((data, key)=>{
        
        if(!data){
            return cb(null, key);
        }
        return cb(data, key);
    })
}


 function getPostById(id, cb){
    return getPosts(
        post => post.id === id ? post: undefined,
        (data, key) => {
            return cb(data,key)
        }
    )
}


 function  searchPosts(text, cb){
    return getPosts(
        post => {
            if(!post){
                return undefined;
            }
            if(post.title.indexOf(text) >= 0){
                return post;
            }
            if(post.body.indexOf(text) >= 0){
                return post;
            }
            return undefined;
        },
        (data, key) => {
            return cb(data, key);
        }
    )
}

 function getPostsByTagName(tagName, cb){
    return RootNode.get("post_tag/"+tagName).map(
        item => {
            if(!item){
                return undefined;
            }
            if(item.tag === tagName){
                return item;
            }
            return undefined;
        }
    ).once((data, key)=>{
        if(!data){
            return undefined;
        }
        RootNode.get("posts/"+data.postId).once((data,key)=>{
            return cb(data,key);
        })
    })
}

module.exports = {
    getPostById,
    getPostReadTimes,
    getPostsByTagName,
    createPost,
    searchPosts,
    addPostReadTimes,
    getPosts,
    updatePost,
}

