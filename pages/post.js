import Layout from "../components/Layout";
import { getPostById, addPostReadTimes } from '../api/posts';
import { getPostBodyById } from '../api/post_body';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Head from 'next/head';
import renderHTML from 'react-render-html';

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
      body: ""
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
      

      getPostById(parsed.id, (data, key)=>{
        this.setState({
          ...data,
          loading: false,
        })
       
        addPostReadTimes(data.id, (rlt, err)=>{
          console.log(rlt, err);
          
        })
        
      })
      
    }

  }

  render() {
    const { loading, bodyLoading,title,  who, createdAt, body, visited } = this.state;
    
    
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
        <section className="hero">
          <div className="hero-body">
            <div className="container"  style={{width: "100%"}}>
              <h1 className="title has-text-centered">
                {title}
              </h1>
                <h2 className="subtitle has-text-centered">
                 {who}---------------{moment(createdAt).format('YYYY 年 MMMM , h:mm:ss a')}
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
