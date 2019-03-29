import Layout from "../components/Layout";
import { getPostById, addPostReadTimes } from '../api/posts';
import { RootNode } from '../gunDB/index.js'
import { getPostBodyById } from '../api/post_body';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Head from 'next/head';
import renderHTML from 'react-render-html';
import Link from 'next/link';


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
      body: "", tags: []
    }
  }

  async componentDidMount(){
    if(window){
      const queryString = require('query-string');
      const parsed = queryString.parse(window.location.search);
      console.log({parsed});
      
      let body = await getPostBodyById(parsed.id);
      

      if(body){
        this.setState({
          bodyLoading: false,
          body,
        })
      }
      

      const data = await getPostById(parsed.id);
      this.setState({
        ...data,
        loading: false,
      })
      const { tags } = this.state;
      RootNode.get("post_tags/"+parsed.id).map().once((data,key)=>{
         tags.push(data.tag);
         this.setState({
           tags,
         })
      });

      const visited =  await RootNode.get("post_visited/"+parsed.id);
      await RootNode.get("post_visited/"+parsed.id).put(visited+1);
      this.setState({
        visited: visited+1,
      })
      
    }

  }

  render() {
    const { loading, bodyLoading,title,  who, createdAt, body, visited, tags } = this.state;
    
    
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
                   
        </Head>
        <section className="hero" style={{
          overflowY: "auto",
          height: "90%",
        }}>
          <div className="hero-body">
            <div className="container"  style={{width: "100%", overflowY: "auto"}}>
              <h1 className="title has-text-centered">
                {title}
              </h1>
                <h2 className="subtitle has-text-centered">
                 {who}---------------{moment(createdAt).format('YYYY 年 MMMM , h:mm:ss a')}
                </h2>
                <h2 className="subtitle has-text-centered">
                  {
                    tags.map((tag, index)=>
                    <Link key={index} href={"/posts?tag="+tag}>
                      <a><span className="tag is-info" >{tag}</span></a>
                    </Link>
                     
                      )
                  }
                </h2>
              { bodyLoading && <progress className="progress is-large is-info" max="100">60%</progress>}
              <article className="article">
                {body? renderHTML(body): renderHTML("<span></span>")}
              </article>
              <div>阅读量({visited})</div>
            </div>
          </div>
        </section>
        </Layout>
       
      
    )
  }
}
