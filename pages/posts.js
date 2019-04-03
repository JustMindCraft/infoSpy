import Layout from "../components/Layout";
import PostsBlock from "../components/index/PostsBlock";
import Link from 'next/link';

export default class extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            afterTime: 1000*60*60*24,
            limit: "day",
            loading: true,
            title: "最新24小时",
            status: "published",
            author: "",
        }
    }
    changeAfterTime = (afterTime, limit)=>{
        this.setState({
            afterTime,
            limit
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.url.query.limit!== nextProps.url.query.limit){
            window.location.reload();
        }
        
        
    }
   

    componentDidMount(){
        if(window){
            const queryString = require('query-string');
            const parsed = queryString.parse(window.location.search);
            console.log(parsed);
            
            let limit  = parsed.limit;
            let status = parsed.status;

            const author = parsed.author;
            if(author){
                const host = window.localStorage.getItem("user_host");
                const userId = window.localStorage.getItem("user_id");
                const username = window.localStorage.getItem("user_username");
                const logined = host && username && userId;
                if(!logined){
                    window.location.assign("/login");
                    return alert("请先登录")
                }
            }
            this.setState({
                author,
            })
           
            
            
            let statusTitle = "";
            if(!status){
                status = "published";
                statusTitle = "";
                this.setState({
                    status,
                })
            }else{
                statusTitle = status==="published"? "":"草稿";

                this.setState({
                    status
                })
            }
            if(!limit){
                limit="day"
            }
            switch (limit) {
                    case "day":
                        this.setState({
                            limit,
                            afterTime: 1000*60*60*24,
                            loading: false,
                            title: author+"最新24小时"+statusTitle
                        })
                    break;
                    case "week":
                    this.setState({
                        limit,
                         afterTime: 1000*60*60*24*7,
                         loading: false,
                         title: author+"最新一周"+statusTitle

                    })
                    break;
                    case "40days":
                    this.setState({
                        limit,
                         afterTime: 1000*60*60*24*40,
                         loading: false,
                         title: author+"最新40日"+statusTitle

                    })
                    break;
                    case "all":
                    this.setState({
                        limit,
                         afterTime: (new Date()).getTime(),
                         loading: false,
                         title: "全部"+statusTitle

                    })
                    break;
            
                default:
                    break;
            }
            this.setState({
                limit,
            })
            
            
        }
    }
    render(){

        const { afterTime, limit, loading, title, status, author } = this.state;
        
        return (

            <Layout>
              
              <div className="tabs  is-centered">
              <ul>
                  <li className={limit==="day"? "is-active": ""} ><Link href={`/posts?author=${author}&limit=day&status=${status}`}><a>24小时</a></Link></li>
                  <li className={limit==="week"? "is-active": ""}><Link href={`/posts?author=${author}&limit=week&status=${status}`}><a>一周</a></Link></li>
                  <li className={limit==="40days"? "is-active": ""}><Link href={`/posts?author=${author}&limit=40days&status=${status}`}><a>40天</a></Link></li>
                  <li className={limit==="all"? "is-active": ""}><Link href={`/posts?author=${author}&limit=all&status=${status}`}><a>一年</a></Link></li>
              </ul>
          
             
          
          
              </div>
              {     
                  !loading &&
                  <React.Fragment>
                        <PostsBlock query={{
                                    status:  status,
                                    afterTime: afterTime,
                                    author,
                    }}  title={title}/>
                  </React.Fragment>
              }
             
            </Layout>
            
          )
    } 
} 
