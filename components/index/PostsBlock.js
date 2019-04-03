import queryPosts from "../../gunApi/query";
import getBrowserGun from "../../gunDB/browser";
import Card from "../Card";
import Link from 'next/link';

export  default class PostsBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [], 
            loading: true,
        }
    }

    componentDidMount(){
        const { query } = this.props;
        
        if(window){
            this.setState({
                posts: [],
                loading: true,
            })
            const instance = getBrowserGun(window);
            const { RootNode } = instance;
            const { posts } = this.state; 
            queryPosts(RootNode, query, (post, id)=>{
                posts.unshift(post);
                this.setState({
                    posts,
                    loading: false,
                })
            })
        }
       
       
    }
   

    render(){
        const { posts, loading } = this.state;
        const { moreLink } = this.props;
        
        return (
            <React.Fragment>
                <h2 className="title">{this.props.title}:</h2>
                <div style={{
                display: 'flex',
                flexWrap: "wrap",
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
            }}>
            
                {
                    !loading  &&
                    posts.map((item, index)=>
                        <Card key={index} id={item.uuid} title={item.title} cover={item.cover} createdAt={item.createdAt} tags={item.tags}  visited={item.visited} />
                    )
                }
                {
                        !loading && moreLink && <Link href={this.props.moreLink}><a className="button is-info is-fullwidth  is-outlined">查看更多{this.props.title}......</a></Link>
                }
                   

            </div>
            </React.Fragment>
            
            
        )
    }
}