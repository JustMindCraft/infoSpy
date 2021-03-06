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
            title: "最新24小时"
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
            let limit  = parsed.limit;
            if(!limit){
                limit="day"
            }
            switch (limit) {
                    case "day":
                        this.setState({
                            limit,
                            afterTime: 1000*60*60*24,
                            loading: false,
                            title: "最热24小时"
                        })
                    break;
                    case "week":
                    this.setState({
                        limit,
                         afterTime: 1000*60*60*24*7,
                         loading: false,
                         title: "最热一周"

                    })
                    break;
                    case "40days":
                    this.setState({
                        limit,
                         afterTime: 1000*60*60*24*40,
                         loading: false,
                         title: "最热40日"

                    })
                    break;
                    case "all":``
                    this.setState({
                        limit,
                         afterTime: (new Date()).getTime(),
                         loading: false,
                         title: "全部最热"

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

        const { afterTime, limit, loading, title } = this.state;
        
        return (

            <Layout>
              
              <div className="tabs  is-centered">
              <ul>
                  <li className={limit==="day"? "is-active": ""} ><Link href="/hot?limit=day"><a>24小时</a></Link></li>
                  <li className={limit==="week"? "is-active": ""}><Link href="/hot?limit=week"><a>一周</a></Link></li>
                  <li className={limit==="40days"? "is-active": ""}><Link href="/hot?limit=40days"><a>40天</a></Link></li>
                  <li className={limit==="all"? "is-active": ""}><Link href="/hot?limit=all"><a>全部</a></Link></li>
              </ul>
          
             
          
          
              </div>
              {     
                  !loading &&
                  <React.Fragment>
                        <PostsBlock query={{
                                    status: "published",
                                    hot: 3,
                                    afterTime: afterTime
                    }}  title={title}/>
                  </React.Fragment>
              }
             
            </Layout>
            
          )
    } 
} 
