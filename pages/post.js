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
      tags: []
    }
  }

  async componentDidMount(){
    if(window){
      const queryString = require('query-string');
      const parsed = queryString.parse(window.location.search);
      const instance  = getBrowserGun(window);
      const { RootNode } = instance;
      console.log(parsed);
      
      RootNode.get("posts")
      .map(
        post=> {
          if(!post){
            return undefined;
          }
          if(!post.id){
            return undefined;
          }
          if(post.id===parseInt(parsed.id)){
            return post;
          }
          return undefined
        }
      )
      .on( async (data,key)=>{
        
        this.setState({
          ...data,
          loading: false,
          bodyLoading: false,
        })
        let visited = await RootNode.get("post_visited/"+key);
        if(!visited){
          visited = 0
        }
        visited++;
        RootNode.get("post_visited/"+key).put(visited, ack=>{
          if(ack.err){
            console.log(ack);
            return false;
          }
          return this.setState({
            visited,
          })
        })
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
          height: "100%",
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
              <article className="article" style={{textAlign: "left", fontSize: "27px"}}>
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
