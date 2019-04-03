import Layout from "../components/Layout";
import Loader from "../components/Loader";
import getBrowserGun from "../gunDB/browser";
import PostsBlock from "../components/index/PostsBlock";

let count = 0;
export default class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      text: "",
      
    }
  }


  search = async (text) => {
    if(window){
      const instance = getBrowserGun(window);
      const { RootNode } = instance;
      let limit = pagesize;
     
    }
  }

  
  

  



  handleInput =  async (e)=>{
    
    this.setState({
      text: e.target.value,
      loading: true,
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading:false,

    })

   
  }



  render(){
    const { loading, text} = this.state;
    console.log(text);
    
    
    return (
      <Layout>
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
          <PostsBlock query={{
                  status: "published",
                  title: text,
                  body: text
      }}  title={text+":"+"搜索结果"}/>
        }
      
        
       
      </Layout>
      
    )
  }
}
