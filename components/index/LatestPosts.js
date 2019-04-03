import PostsBlock from "./PostsBlock";

export default ()=> 
<PostsBlock query={{
    status: "published",
    limit: 6,
    afterTime: 1000*60*60*24*24
}} moreLink="/latest"/>