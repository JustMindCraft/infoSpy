import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Loader from "../components/Loader";
import getBrowserGun from "../gunDB/browser";

class Posts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true,
            adding: false,
            tag: "",
            page: 1,
            pagesize: 38
        }
    }

    getTag(){
        const queryString = require('query-string');
        const parsed = queryString.parse(window.location.search);
        const tag = parsed.tag;
        return tag;
    }

    async componentDidMount(){
        const tag = this.getTag();
        this.setState({
            posts: [],
            loading: true,
            adding: false,
            tag,
            page: 1,
            proccess:false,
            changed: false,

        })
        console.log("didmount");
        
        await this.getTagPosts(1, 38, tag);
        
    }

    async componentWillReceiveProps(nextProps){
        if(this.props!== nextProps){
            window.location.reload();
        }
    }

    getTagPosts = async (page, pagesize, tag) => {

        const instance = getBrowserGun(window)
        const { RootNode } = instance;
        
        const tag_posts_count = await RootNode.get("tag_posts_count/"+tag);
        const { posts } = this.state;
        this.setState({
            proccess: true,
        })
        for (let index = 0; index < pagesize; index++) {
           
            const tagIndex =  tag_posts_count-((page-1)*pagesize)-index;
            const postId = await RootNode.get("tag_posts/"+"/"+tag+"/"+tagIndex)
            const post = await RootNode.get("posts/"+postId)
            if(!posts){
                continue;
            }
        
            if(post && post.id){
                posts.push(post);
            }
            this.setState({
                posts,
                adding: false,
                loading: false,
                tag,
               
            })
        }
        this.setState({
            proccess: false,
        })
        
    }
    componentWillMount(){
        console.log("leave");
        this.setState(
            {
                posts: [],
                loading: true,
                adding: false,
                tag: "",
                page: 1,
                proccess:false,
                changed: false,
    
            }
        )
        
    }
    handleOnScroll = async e => {
        const { page, pagesize } = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
        
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
            this.setState({
                adding: true,
            })
           await this.getTagPosts(page+1, pagesize, this.getTag());
           return this.setState({
                adding: false,
                page: page+1,

            })

        } 

        if(scrollTop===1){
           this.setState({
               posts: [],
               adding: true,
           })
           await this.getTagPosts(1,20, this.getTag());
           return this.setState({
                adding: false,
                page: 1,
             })
            
        }   
        
        
    }

    render(){
        const { posts, tag, loading, adding, changed } = this.state;
        if(changed){
            return(
                <Layout>
                    <Loader />
                </Layout>
            ) 
                
        }
        return (
            <Layout>
                <h1 className="title">"{tag}"：</h1>
                {
                    adding &&  
                    <div className="has-text-centered blue">加载更多中......</div>
                }
                {
                    loading ?  <Loader /> :
                    <PostList list={posts} handleOnScroll={this.handleOnScroll} />
                }
                {
                    adding &&  
                    <div className="has-text-centered blue">加载更多中......</div>
                }
               
            </Layout>
        )
    }
}

export default Posts;
