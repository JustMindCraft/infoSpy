import { getPosts } from '../api/posts';
import PostList from './PostList';

export default class LastestPosts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true,
            adding: false,
            lastPostTime: 0,
            addingCount: 0
        }
    }
   
    getPrevTimePost = (limitBefore, limitAfter) =>{
        //获取过去五分钟的post
        
        const { posts } = this.state;
        let count = 0;
        return  getPosts(
            post => {
                if(!post){
                    return undefined;
                }
               
                
                if(post.createdAt<=limitBefore && post.createdAt>=limitAfter ){
                    return post
                }
                return undefined
            },
            (data, key) => {
                
                if(data){
                    count = count+ 1;
                    
                    posts.push(data);
                    return this.setState({
                        posts,
                        loading: false,
                        adding: false,
                        lastPostTime: limitAfter,
                        addingCount: count,
                    })
                    
                }
              
            }
        )

    }
    
    componentDidMount(){
        this.getPrevTimePost((new Date()).getTime(), (new Date()).getTime()-1000*60*30);
        
       
    }
    handleOnScroll = e => {
        const { posts, lastPostTime, addingCount } = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
            
            this.setState({
                adding: true,
                addingCount: 0,
            })
            const backTime = addingCount===0? 1000*60*60*2 : 1000*60*5;
            this.getPrevTimePost(lastPostTime, lastPostTime-backTime);
        }    
        
        
    }

    render(){
        const { posts, loading, adding, addingCount } = this.state;

        return (
            <div onScroll={this.handleOnScroll} style={{height: "90%", overflowY: "scroll"}}>
                {
                    !loading && 
                    <PostList list={posts} />
                }
                <br/>
                <br/>
                <br/>
                {
                    adding &&  
                    <div className="has-text-centered blue">加载更多中......</div>
                }
               
                    
            </div>
           
        )
    }
}