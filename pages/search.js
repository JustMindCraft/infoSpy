import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PostList from "../components/PostList";
import getBrowserGun from "../gunDB/browser";

let count = 0;
export default class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      input: true,
      text: "",
      posts: [],
      searchWait: 0,
      textHistory: [],
      adding: false,
      page: 1,pagesize: 28,
      postIds: [],
    }
  }


  search = async (text) => {
    if(window){
      const instance = getBrowserGun(window);
      const { RootNode } = instance;
      const posts_count = await RootNode.get("posts_count");
      const {posts, page, pagesize, postIds} = this.state;
      let limit = pagesize;
      count = (page-1)*limit;
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
          if(count>(limit*page)){
            return undefined;
          }
          if(count>=posts_count){
            return undefined;
          }
         
          if(post.title.indexOf(text)>=0){
              count++;
              return post;
          }
          if(post.body.indexOf(text)>=0){
            count++;
            return post;
          }

          return undefined;
        }
      ).once((data,key)=>{
          if(data){
            if(posts.includes(data)){
              return this.setState({
                posts,
                loading: false,
              });
            }
            posts.push(data);
            if(count>(limit*page)){
              return this.setState({
                posts,
                loading: false,
                page:page+1,
            });
            }
            return this.setState({
                posts,
                loading: false,
            })
          }
          

        
      })
    }
  }

  
  

  



  handleInput =  async (e)=>{
    
    this.setState({
      text: e.target.value,
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const {text} = this.state;
    await this.search(text);
    this.setState({
      loading:true,
      titlePosts: [],

    })

   
  }

  handleOnTitleScroll = async (e) => {
        const { text} = this.state;
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
        
        if(e.target.scrollHeight == e.target.clientHeight + scrollTop ) {
          this.setState({
            loading:false,
            adding: true,
          })
          await this.search(text);
        } 
          
        
  }

  render(){
    const { loading, text, posts, adding } = this.state;
    
    return (
      <Layout  handleOnScroll={this.handleOnTitleScroll}>
          <form onSubmit={this.handleSubmit} className="field has-addons" style={{
            justifyContent: "center"
          }}>
                <div className="control">
                    <input style={{width: "100%"}} value={text} autoFocus className="input"  type="text" placeholder="搜索：　标题　| 内容　| 标签" onChange={this.handleInput} />
                </div>
                <div className="control">
                      <button type="submit" className="button is-info">搜索</button>
                </div>
          </form>
        
        {
          loading ? <Loader /> : 
              <PostList list={posts} />
        }
        {
          adding && 
          <a>加载更多</a>
        }
        
       
      </Layout>
      
    )
  }
}
