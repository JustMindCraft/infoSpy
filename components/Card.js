import moment from 'moment';
import 'moment/locale/zh-cn';
import Link from 'next/link';


export default (props) => (
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
                <span>阅读量({props.visited})</span>
            </div>
        </div>
    </div>
)