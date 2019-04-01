import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import Head from 'next/head';

export default class NewPost extends React.Component{
    render(){
        return (
            <Layout>
                <Head>
                <link rel="stylesheet" href="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1554063293/cdn/quill.snow.css" crossOrigin="anonymous" />

                </Head>
                <h1 className="title">创作文章</h1>
                <hr/>
                <PostForm />
            </Layout>
        )
    }
}