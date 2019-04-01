import PostList from './PostList';
import Loader from './Loader';
import { getPosts } from '../gunApi/posts';


export default class LastestPosts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true,
            adding: false,
            lastPostTime: 0,
            addingCount: 0,
            page: 1,
            pagesize: 38
        }
    }

   
    
    async componentDidMount(){
        const { page, pagesize } = this.state;
        this.setState({
            posts: [],
            loading: true,
            adding: false,
            tag: "",
        })
        const posts = await getPosts(1,25);
        console.log(posts);
        
        this.setState({
            posts,
            loading: false,
        })
        if(posts.length === 0 || !posts){
            setTimeout(()=>{
                window.location.reload();
            }, 1234)
        }
        
    }
    handleOnScroll = async e => {
        const { posts, page, pagesize } = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;

        // console.log(scrollTop, e.target.scrollHeight, e.target.clientHeight);
        
        
        
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
            this.setState({
                adding: true,
            })
            const newPosts = await getPosts(page+1,pagesize);
            this.setState({
                posts: posts.concat(newPosts),
                loading: false,
                page: page+1,
                adding: false,
            })


        
        } 
        if(scrollTop===0){
            this.setState({
                adding: true,
            })
            const newPosts = await getPosts(1,38);
            return this.setState({
                posts: newPosts,
                loading: false,
                page: 1,
                adding: false,
            })
        }   
        
        
    }

    render(){
        const { posts, loading, adding } = this.state;

        return (
            <React.Fragment>
                {
                    adding &&  
                    <div className="has-text-centered blue">加载更多中......</div>
                }
                {
                    loading ?  <Loader /> :
                    <PostList list={posts}  />
                }
                {
                    adding &&  
                    <div className="has-text-centered blue">加载更多中......</div>
                }
               
            </ React.Fragment>
                    
           
        )
    }
}