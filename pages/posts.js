import Layout from "../components/Layout";
import { RootNode} from '../gunDB/index.js';
import PostList from "../components/PostList";
import { withRouter } from 'next/router';
import Loader from "../components/Loader";

class Posts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true,
            adding: false,
            tag: "",
            page: 1,
            pagesize: 15
        }
    }

    async componentDidMount(){
        const { router } = this.props;
        const tag = router.query.tag;
        
        this.setState({
            posts: [],
            loading: true,
            adding: false,
            tag,
            page: 1,
        })
        console.log("didmount");
        
        await this.getTagPosts(1, 15, tag);
        
    }

    async componentWillReceiveProps(nextProps){
        const { router } = nextProps;
        const tag = router.query.tag
        
        this.setState({
            posts: [],
            loading: true,
            adding: false,
            tag,
            page: 1
        });
        await this.getTagPosts(1,15, tag);
       
        
    }

    getTagPosts = async (page, pagesize, tag) => {
        console.log({page});
        
        const tag_posts_count = await RootNode.get("tag_posts_count/"+tag);
        const { posts } = this.state;
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
                loading: false,
                adding: false,
                tag,
            })
        }
    }
    componentWillMount(){
        console.log("leave");
        
    }
    handleOnScroll = async e => {
        const { page, pagesize } = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
        const { router } = this.props;
        const tag = router.query.tag;
        
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
            this.setState({
                adding: true,
            })
           await this.getTagPosts(page+1, pagesize, tag);
           return this.setState({
                adding: false,
                page: page+1,

            })

        } 

        if(scrollTop===0){
           this.setState({
               posts: [],
               adding: true,
           })
           await this.getTagPosts(1,10, tag);
           return this.setState({
                adding: false,
                page: 1,
             })
            
        }   
        
        
    }

    render(){
        const { posts, tag, loading, adding } = this.state;
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

export default withRouter(Posts)
