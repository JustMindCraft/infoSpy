import Layout from "../components/Layout";
import Head from 'next/head';
import PostForm from "../components/PostForm";



export default class Admin extends React.Component{

  componentDidMount(){
   
  }
  

  render(){
    return (
      <Layout>
            <Head>
              <title>灰机网-管理中心</title>
            </Head>
          <h1>管理主页</h1>
          <PostForm />
      </Layout>
    )
  }
} 