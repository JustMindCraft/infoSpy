import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getPosts } from '../api/posts';
import PostList from "../components/PostList";


let timer = null;
export default class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      input: false,
      text: "",
      titlePosts: [],
      searchWait: 0,
      textHistory: [],
    }
  }

  componentDidMount(){
   
  }



  
  searchTitle = (text) =>{
    const { titlePosts } = this.state;
      getPosts(
        post => {
          if(!post){
            return undefined;
          }
          if(text===""){
            return undefined;
          }
          if(post.title.indexOf(text)){
           
            return post;
          }
          return undefined;
        },
        (data, key)=>{
          
          if(titlePosts.length> 10){
           
            return this.setState({
              loading: false,
            });
            
          }else{
            titlePosts.unshift(data);
            return this.setState({
              titlePosts,
              loading: false,
            })
          }
          
        
          
          
        }
      )
  }

  
  componentDidUpdate(preState){
    const { textHistory, searchWait} = this.state;
    if(searchWait>=2){
      clearInterval(timer);
      console.log(searchWait);
      
      
    }
  }


  handleInput = (e)=>{
    
    const { textHistory } = this.state;
    textHistory.push(e.target.value)
    this.setState({
      text: e.target.value,
      input: e.target.value===""? false: true,
      loading: true,
      titlePosts: [],
      searchWait: 0,
      textHistory,
    });
   

    
    if(e.target.value===""){
      return false;
    }
    let count = 0;
    timer= setInterval(()=>{
      count++;
      this.setState({
        searchWait: count
      });
     
    }, 1000)

    
    
   

  }

  render(){
    const { input, loading, text, titlePosts, textHistory } = this.state;
    
    return (
      <Layout>
        <form >
            <div className="field section">
              <div className="control">
                  <input value={text} autoFocus className="input"  type="text" placeholder="搜索：　标题　| 内容　| 标签" onChange={this.handleInput} />
              </div>
          </div>
        </form>
        {
          loading  && <Loader />
        }
        {
          input && 
          <section className="section">
          <div>
            <h2>标题：{text}</h2>
            <PostList list={titlePosts} noImage={true}/>
          </div>
          <div>
            <h2>标签:{text}</h2>
          </div>
          <div>
            <h2>内容:{text}</h2>
          </div>
        </section>
        }
        
       
      </Layout>
      
    )
  }
}
