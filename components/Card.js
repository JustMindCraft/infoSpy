import moment from 'moment';
import 'moment/locale/zh-cn';
import Link from 'next/link';
import { RootNode } from '../gunDB/index.js'


export default class Card extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            visited: 0,
        }
    }

    async componentDidMount(){
        const visited =  await RootNode.get("post_visited/"+this.props.id);
        this.setState({
            visited,
        })
    }

    render(){
        const {props} = this;
        const { visited } = this.state;
        return (
            <div className="card" style={{
                maxWidth: 365,
                margin: 10
            }}>
                {
                    props.cover && 
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
                        <span>阅读量({visited})</span>
                    </div>
                </div>
            </div>
        )
    }
   
}