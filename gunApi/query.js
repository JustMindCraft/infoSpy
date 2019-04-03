const queryConditon = (post, query) => {
    const tags = query.tags? query.tags.toString().split(","): [];
    const title = query.title? query.title: "!@#$%|~"; 
    const author = query.author? query.author: "";
    const body = query.body? query.body: "!@#$%|~";
    const status = query.status? query.status: "";
    const afterTime = query.afterTime? query.afterTime: 1000*60*60*24;
    
    if(!post){
        return undefined;
    }
   
    let isOut = false;
    //判断一个数据是否能够被放出
   
    
    

    if(post.author === author || query.author === undefined){
        isOut = true;
    }else{
       return undefined;
    }
   
    if(post.status === status || query.status === undefined){
        isOut = true;
    }else{
        return undefined;
    }
    
    if(post.recommend === query.recommend || query.recommend === undefined){
        isOut = true;
    }else{
        return undefined;
    }

    if( post.visited && post.visited >= query.hot || query.hot === undefined){
        isOut = true;
    }else{
        return undefined;
    }
   
   
    if(post.updatedAt >= ((new Date()).getTime() - afterTime)){
        isOut = true;
    }else{
        return undefined;

    }

    const tagsInData = post.tags? post.tags.toString().split(","): [];
    const same = tags.filter(tag=> tagsInData.includes(tag));
    if(same.length!==0 || query.tags === undefined){
        isOut = true;
    }else{
        isOut = false;
    }
    if(post.title.indexOf(title)>=0 || query.title === undefined){
        isOut = true;
    }else{
        isOut = false;
    }
    if(post.body.indexOf(body)>=0 || query.body === undefined){
        isOut = true;
    }else{
        isOut = false;
    }
    
    return isOut? post: undefined;
}

export default function queryPosts(RootNode, query, cb){
    
    let count = query.limit ? query.limit : undefined;
    RootNode.get("posts").map(
        post => queryConditon(post, query)
    ).once((post, id)=>{
        
        if(post && count!==undefined){
            count = count -1;
        }else{
            return cb(post, id);
        }
        if(count>=0){
           return cb(post,id);
        }
        return false;
    })
}

