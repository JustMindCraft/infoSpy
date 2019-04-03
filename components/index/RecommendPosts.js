import PostsBlock from "./PostsBlock";

export default ()=> 
<PostsBlock query={{
    status: "published",
    limit: 6,
    recommend: true,
    afterTime: 1000*60*60*24*365
}} moreLink="recommend"/>