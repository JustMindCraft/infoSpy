import moment from 'moment';
import 'moment/locale/zh-cn';
import Link from 'next/link';
import getBrowserGun from '../gunDB/browser';


export default class Card extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            visited: 0,
            tags: [],
        }
    }

    async componentDidMount(){
        const { tags } = this.state;
        if(!window){
            return false;
        }
        const instance = getBrowserGun(window)
        const { RootNode } = instance;
        let visited =  await RootNode.get("post_visited/"+this.props.id);
        if(!visited){
            visited = 0;
        }

        this.setState({
            visited,
        });
        RootNode.get("post_tags/"+this.props.id).map().on((data,key)=>{
            if(data){
              tags.push(data.tag);
              this.setState({
                tags,
              })
            }
            
          });
    }

    render(){
        const {props} = this;
        const { visited, tags } = this.state;
        return (
            <div className="card" style={{
                maxWidth: 365,
                margin: 10
            }}>
                {
                    props.cover && !props.noImage && 
                    <Link href={"/post?id="+props.id}>
                    <a>
                        <div className="card-image">
                            <figure className="image">
                            <img src={props.cover} alt="Placeholder image" />
                            </figure>
                        </div>
                    </a>
                        
                    </Link>
                    
                }
                
                <div className="card-content">
                    <div className="media">
                   
                    <div className="media-content">
                    <Link href={"/post?id="+props.id}>
                        <a style={{textDecoration: "none", color: "black"}}>
                        {props.title}
                        </a>
                    </Link>
                        
                    </div>
                    </div>
        
                    <div className="content" style={{display: 'flex', justifyContent: "space-between"}}>
                        <time dateTime={moment(props.createdAt)}>{moment(props.createdAt).fromNow()}</time>
                        <div>{tags.map((tag,index)=>{
                                return (
                                    
                                    <span key={index}>
                                    <Link href={"/posts?tag="+tag}>
                                    <a>#{tag}</a>
                                    </Link>
                                    
                                    </span>
                                )
                            })}
                        </div>
                        <span>阅读量({visited})</span>
                    </div>
                </div>
            </div>
        )
    }
   
}