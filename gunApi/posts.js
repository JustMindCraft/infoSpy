import getBrowserGun from "../gunDB/browser";



 export async function  putPost(
    postParams={
        title: "未命名标题",
        body: "",
        tags: [],
        cover: "",
        who: "",
        isFrame: false,
        status: 'published',
        id: require("uuid/v4")(),
    },
    cb
){
    if(!window){
        return false;
    }
    const instance  = getBrowserGun(window);
    const { RootNode } = instance;
    const uuid = postParams.id;
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
        let posts_count = await RootNode.get("posts_count");
        if(!posts_count){
            posts_count = 0;
        }
        await RootNode.get("posts_count").put(posts_count+1);
        posts_count++;

        await RootNode.get("posts_index/"+posts_count.toString()).put((await RootNode.get("posts/"+uuid)).id);
        await RootNode.get("posts_index/body").get(uuid).put({id: uuid, body: postParams.body});//用于搜索
        await RootNode.get("posts_index/title").get(uuid).put({id: uuid, title: postParams.title});
        await RootNode.get("post_bodys/"+uuid).put(postParams.body);
        await RootNode.get("post_titles/"+uuid).put(postParams.title);
        await RootNode.get("post_visited/"+uuid).put(0);
        for (let index = 0; index < postParams.tags.length; index++) {
            const tag = postParams.tags[index];
            await RootNode.get("post_tags/"+uuid).get(index).put({index, tag});
            await RootNode.get("tags/"+tag).put({tag, createdAt: now(), isTop: false});//用于判断tag是否存在
            let  tags_count = await RootNode.get("tags_count");//当前标签数量
            if(!tags_count){
                tags_count = 0;
            }
            tags_count++;
            await RootNode.get("tags_count").put(tags_count);//当前标签数量加一
            await RootNode.get("tags_index/"+tags_count).put(await RootNode.get("tags/"+tag));
            await RootNode.get("tag_is_top/").get(tag).put(false);//默认tag
            let tag_posts_count = await RootNode.get("tag_posts_count/"+tag);//当前标签有文章的数量
            if(!tag_posts_count){
                tag_posts_count = 0;
            }
            tag_posts_count++;
            await RootNode.get("tag_posts_count/"+tag).put(tag_posts_count);

            await RootNode.get("tag_posts/"+"/"+tag+"/"+tag_posts_count).put(uuid);//用于判断搜索post是否存在
            console.log("标签情况==============================");
            
            console.log({
                tag_posts_count,
                postId: await RootNode.get("tag_posts/"+"/"+tag+"/"+tag_posts_count),
                tag,
            });
            console.log("标签情况==============================");

            
        }
        cb(posts_count, null);
    } catch (error) {
        cb(null, error);
    }
   
}



 export async function addPostReadTimes(id,cb){
     if(!window){
         return false;
     }
    const instance  = getBrowserGun(window);
    const { RootNode } = instance;
    const uuid = postParams.id;
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

export async function getPostsByTag(page, pagesize){
    
}

 export async function getPosts(page, pagesize, status){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
    const posts_count = await RootNode.get("posts_count");
    const posts = [];
    for (let index = 0; index < pagesize; index++) {

        const postIndex =  posts_count-((page-1)*pagesize)-index;
        const post_id = await RootNode.get("posts_index/"+postIndex);
        const post = await RootNode.get("posts/"+post_id);
        if(!post){
            continue;
        }
        if(posts && post.id){
            posts.push(post);
        }
    }
    return posts;
    
}


 export async function getPostById(id){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
    return await RootNode.get("posts/"+id);
}


 export function  searchPosts(text, cb){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
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

 export function getPostsByTagName(tagName, cb){
    if(!window){
        return false;
    }
   const instance  = getBrowserGun(window);
   const { RootNode } = instance;
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

