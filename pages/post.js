import Layout from "../components/Layout";
import moment from 'moment';
import 'moment/locale/zh-cn';
import Head from 'next/head';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import getBrowserGun from "../gunDB/browser";
import dynamic from 'next/dynamic';

dynamic(
  () => import('../components/TextEditor.css'),
  {
    ssr: false
  }
);
dynamic(
  () => import('react-quill/dist/quill.snow.css'),
  {
    ssr: false
  }
);

export default  class PostPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      bodyLoading: true,
      title: "",
      who: "",
      createdAt: "",
      visited: 0,
      body: "", 
      tags: "",
      logined: false,
      username: ""
    }
  }

  async componentDidMount(){
    if(window){
      const host = window.localStorage.getItem("user_host");
      const userId = window.localStorage.getItem("user_id");
      const username = window.localStorage.getItem("user_username");
      const logined = host && username && userId;
      if(logined){
        this.setState({
          logined,
          username,
        })
      }
      const queryString = require('query-string');
      const parsed = queryString.parse(window.location.search);
      const instance  = getBrowserGun(window);
      const { RootNode } = instance;
     
      
      RootNode.get("posts")
      .map(
        post=> {
          if(!post){
            return undefined;
          }
         
          if(post.uuid===parsed.id){
            return post;
          }
          return undefined
        }
      )
      .on( async (data,key)=>{
        if(!data){
          return false;
        }
        this.setState({
          ...data,
          loading: false,
          bodyLoading: false,
        })
        
      });
      let visited = await RootNode.get("posts").get(parsed.id).get("visited");
      if(!visited){
        visited = 0
      }
      visited++;
      RootNode.get("posts").get(parsed.id).get("visited").put(visited, ack=>{
        console.log(ack);
        
        if(ack.err){
          console.log(ack);
          return false;
        }
        return this.setState({
          visited,
        })
    })
    let user_posts_visited = await RootNode.get("user_posts_visited").get(username);
    if(!user_posts_visited){
      user_posts_visited = 0;
    }
      await RootNode.get("user_posts_visited").get(username).put(user_posts_visited+1);
    }

  }

  onDelete =  (e)=>{
    if(confirm("确实需要删除本篇吗?注意，请尽量编辑您的文章！在一个区块分布式系统內删除操作可能比较慢，也为影响其他写入操作的速度，欢迎反馈！")){
      if(window){
        const queryString = require('query-string');
        const parsed = queryString.parse(window.location.search);
        const instance  = getBrowserGun(window);
        const { RootNode } = instance;
        RootNode.get("posts").get(parsed.id).put(null,async ack=>{
          console.log(ack);
         
          if(!ack.err){
            let user_posts_count = await RootNode.get("user_posts_count").get(this.state.username);
            if(!user_posts_count){
                user_posts_count=0
            }
            user_posts_count = user_posts_count -1;
          await RootNode.get("user_posts_count").get(this.state.username).put(user_posts_count);

            alert("已经删除");
            return window.location.replace("/dashboard");
          }
          return alert("删除失败，检查网络后重试")
        })

      }
     
    }else{
      return false
    }
  }

  render() {
    const { loading, bodyLoading,title,  author, createdAt, body, visited, tags, logined, username, uuid } = this.state;
    
    
    if(loading){
      return (
        <Layout>
          <progress className="progress is-large is-info" max="100">60%</progress>
        </Layout>
      )
    }
    return (
      <Layout>
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={
              tags.replace(",", " ")  + " 技术 妹纸　安卓 Android IOS 苹果 前端　技术　IT 文章 主题 创业 互联网 区块链 "
            } />
            {/* 当个文章页面SEO优化 */}
            <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1554198985/infoSpy/webtorrent.min.js"></script>
        </Head>
       
              <h1 className="title has-text-centered">
                {title}
              </h1>
                <h2 className="subtitle has-text-centered">
                 {author}---------------{moment(createdAt).format('YYYY 年 MMMM , h:mm:ss a')}
                </h2>
                <h2 className="subtitle has-text-centered">
                  {
                    tags && tags.toString().split(",").map((tag, index)=>
                    <Link key={index} href={"/posts?tag="+tag}>
                      <a><span className="tag is-info" >{tag}</span></a>
                    </Link>
                     
                      )
                  }
                </h2>
              { bodyLoading && <progress className="progress is-large is-info" max="100">60%</progress>}
              <article className="article" style={{textAlign: "left", fontSize: "27px"}}>
                {body? renderHTML(body): renderHTML("<span></span>")}
              </article>
              <div>阅读量({visited})</div>
              {
                logined && username === author &&
                <div className="field is-grouped section" style={{
                  position: 'fixed',
                  bottom: -20,
                  zIndex: 9988,
                  background: "rgba(47, 40, 40, 0.48)"
              }}>
             
                    <div className="control">
                    <Link href={"/edit_post?id="+uuid}><a  className="button is-secondary">编辑</a></Link>
                       
                    </div>
                    <div className="control">
                        <button onClick={this.onDelete} className="button is-danger">删除</button>
                    </div>
              </div>
              }
             
        </Layout>
       
      
    )
  }
}
