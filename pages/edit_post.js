import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import Head from 'next/head';
import getBrowserGun from "../gunDB/browser";

export default class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: null
        }
    }
    async componentDidMount(){
        if(window){
            const queryString = require('query-string');
            const parsed = queryString.parse(window.location.search);
            const instance  = getBrowserGun(window);
            const { RootNode } = instance;
            const post = await RootNode.get("posts").get(parsed.id)
            
            this.setState({
                post,
            })
           
        }
        
    }
    render(){
        return (
            <Layout>
                <Head>
                <link rel="stylesheet" href="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1554063293/cdn/quill.snow.css" crossOrigin="anonymous" />

                </Head>
                <h1 className="title">创作文章</h1>
                <hr/>
                <PostForm  post={this.state.post} />
            </Layout>
        )
    }
}