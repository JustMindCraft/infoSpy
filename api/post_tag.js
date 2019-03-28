const { RootNode } = require("../gunDB");

async function linkTagsToOnePost(postId, tags){
    return  await tags.forEach( async (tag, index) => {
        await RootNode.get("post_tag/"+postId).set({postId, tag});
    });
    
}
async function lintPostsToOneTag(tag, postIds){
    return  await postIds.forEach( async (postId, index) => {
        await RootNode.get("post_tag/"+tag).set({postId, tag});
    });
}

module.exports = {
    linkTagsToOnePost,
    lintPostsToOneTag
}