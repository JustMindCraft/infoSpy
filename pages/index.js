import Layout from '../components/Layout';
import PostsBlock from '../components/index/PostsBlock';


export default class HomePage extends React.Component {
    
    render(){

        return (
            <Layout>
                <PostsBlock query={{
                    status: "published",
                    limit: 6,
                    afterTime: 1000*60*60*24*24
                }} moreLink="/latest"  title="最新"/>
                    <hr/>
                <PostsBlock query={{
                    status: "published",
                    limit: 6,
                    recommend: true,
                    afterTime: 1000*60*60*24*365
                }} moreLink="recommend" title="推荐"/>
                    <hr/>

                
                <PostsBlock query={{
                    status: "published",
                    limit: 6,
                    hot: 3,
                    afterTime: 1000*60*60*24*24
                }} moreLink="/hot" title="热门"/>
            </Layout>
                    
           
        )
    }
}