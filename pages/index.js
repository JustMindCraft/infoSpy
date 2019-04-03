import PostList from '../components/PostList';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import getBrowserGun from '../gunDB/browser';


export default class HomePage extends React.Component {

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
        
       await this.getPosts(page, pagesize);
        
        
    }

    getPosts = async (page, pagesize) => {
        if(window){
            const instance = getBrowserGun(window);
            const { RootNode } = instance;
            const posts_count = await RootNode.get("posts_count");
            let limit = pagesize;
            const {posts} = this.state;

            RootNode.get("posts")
            .map(
              post => {
                if(!post){
                  limit++;
                  return undefined;
                }
                if(!post.id){
                  limit++;
                  return undefined;
                }
                if(!post.title){
                  limit++;
                  return undefined;
                }
                if(post.status!=="published"){
                  limit++;
                  return undefined;
                }
                if(post.id>=posts_count-page*limit && post.id<=posts_count-(page-1)*limit){
                  if(limit>=pagesize){limit--}
                  return post;
                }
                return undefined;
              }
            ).once((data,key)=>{
                
                posts.push(data);
                this.setState({
                    posts,
                    loading: false,
                })
      
              
            })
          }
    }

    handleOnScroll = async e => {
        const {  page, pagesize } = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;

        
        
        
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
            this.setState({
                adding: true,
            })
            await this.getPosts(page,pagesize);
            this.setState({
                loading: false,
                page: page+1,
                adding: false,
            })


        
        } 
        if(scrollTop===0){
            this.setState({
                adding: true,
            })
            await this.getPosts(page,pagesize);
            return this.setState({
                loading: false,
                page: 1,
                adding: false,
            })
        }   
        
        
    }

    render(){
        const { posts, loading, adding } = this.state;

        return (
            <Layout handleOnScroll={this.handleOnScroll}>
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
            </Layout>
                    
           
        )
    }
}