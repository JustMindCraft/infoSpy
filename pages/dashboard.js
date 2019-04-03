import Layout from "../components/Layout";
import getBrowserGun from "../gunDB/browser";
import Link from 'next/link';
import queryPosts from "../gunApi/query";

export default class DashBoard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      isSuper: false,
      id: 0,
      nikel: "",
      statusNote: "",
      published:[],
      draft: [],
      user_posts_visited: 0,
      user_posts_count: 0,
    }
  }
  async componentDidMount(){
    if(window){
      const username = window.localStorage.getItem("user_username");

      const instance = getBrowserGun(window);
      const { gun, RootNode } = instance;
     
      gun.get("users")
      .map(
        user => {
          if(!user){
            return undefined;
          }
          if(user.username = username){
            return user
          }
        }
      ).on(async (data,key)=>{
        console.log(data);
        if(!data){
          return false;
        }
        
        return this.setState({
        ...data
        })
      });
      await this.listPosts(6, "published");
      await this.listPosts(6, "draft");
      let user_posts_visited = await RootNode.get("user_posts_visited").get(username);
      if(!user_posts_visited){
        user_posts_visited = 0;
      }
      let user_posts_count = await RootNode.get("user_posts_count").get(username);
      if(!user_posts_count){
          user_posts_count=0
      }
     this.setState({
      user_posts_visited,
      user_posts_count
     })
     
    }
  }

  listPosts = async (pagesize, status) => {
    if(window){
      const username = window.localStorage.getItem("user_username");
      const instance = getBrowserGun(window);
      const { RootNode } = instance;
      const statusPosts = this.state[status];
      queryPosts(
        RootNode, 
        {
          status, 
          limit: pagesize, 
          author: username,
          afterTime: 1000*60*60*24*365,
        }, 
        (post, key)=>{
        statusPosts.unshift(post);
        const state = {};
        state[status] = statusPosts;
        this.setState(state);
      })
    }
  }

  render(){
    const { username, statusNote, nikel, isSuper, published, draft,user_posts_visited, user_posts_count } = this.state;
    return (
      <Layout>
        <div className="tile is-ancestor" style={{
          width: "90%",
          overflowY: "auto",
          height: "100%",
          marginLeft: 10
        }}>
            <div className="tile is-vertical is-9 panel">
            
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification">
                    <div>
                    <p className="title">
                    {(nikel && nikel!=="")? nikel: "未设置昵称"}
                    </p>
                    ({username})
                    </div>
                    <p className="subtitle">{(statusNote && statusNote!=="")? statusNote: "没有设置个性签名"}</p>
                    <div className="content">
                      <a>个人资料</a>
                    </div>
                  </article>
                  <article className="tile is-child notification">
                    <p className="title">创作</p>
                    <div className="content">
                    <nav className="level">
                            <div className="level-item has-text-centered">
                              <Link href="/new_post">
                                  <a>文章</a>
                              </Link>
                            </div>
                            <div className="level-item has-text-centered">
                              <a>音乐</a>
                            </div>
                            <div className="level-item has-text-centered">
                              <a>视频</a>
                            </div>
                            <div className="level-item has-text-centered">
                              <a>下载</a>
                            </div>
                          </nav>
                    </div>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification">
                    <p className="title">我的发表</p>
                    <nav className="panel"> 
                    {
                      published.map((post, index)=>
                      <p key={index} className="panel-block">{post.title}</p>
                      )
                    }
                    
                    <div className="panel-block">
                    <Link href={`/posts?author=${username}&status=published`}>
                      <a className="button is-link is-outlined is-fullwidth">
                        查看更多
                      </a>
                    </Link>
                      
                    </div>
                    </nav>
                    
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification">
                    <p className="title">草稿</p>
                    <nav className="panel"> 
                    {
                      draft.map((post, index)=>
                      <p key={index} className="panel-block">{post.title}</p>
                      )
                    }
                    
                    <div className="panel-block">
                    <Link href={`/posts?author=${username}&status=draft`}>
                      <a className="button is-link is-outlined is-fullwidth">
                        查看更多
                      </a>
                    </Link>
                    </div>
                    </nav>
                  </article>
                </div>
              </div>
              {
                isSuper && 
                <div className="tile is-parent">
                <article className="tile is-child notification">
                  <p className="title">管理设置</p>
                  <div className="content">
                        <nav className="level">
                            <div className="level-item has-text-centered">
                              <a>标签管理</a>
                            </div>
                            <div className="level-item has-text-centered">
                              <a>权限管理</a>
                            </div>
                            <div className="level-item has-text-centered">
                              <a>用户管理</a>
                            </div>
                            <div className="level-item has-text-centered">
                            <Link href="/setting">
                            <a>网站设置</a>
                            </Link>
                             
                            </div>
                          </nav>
                  </div>
                </article>
              </div>
              }
              
              <div className="tile is-parent" style={{
              width: "100%"
            }}>
                <article className="tile is-child notification ">
                  <p className="title">统计</p>
                  <div className="content">
                          <nav className="level">
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">创造</p>
                                <p className="title">{user_posts_count}篇</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">收藏</p>
                                <p className="title">功能完善中</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">粉丝</p>
                                <p className="title">功能完善中</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">文章浏览量</p>
                                <p className="title">{user_posts_visited}</p>
                              </div>
                            </div>
                          </nav>
                  </div>
                </article>
              </div>
              {/* <div className="tile is-children">
                <article className="tile is-child notification">
                  <p className="title">收入统计</p>
                  <div className="content">
                        <nav className="level">
                             <div>
                                <p className="heading">人民币</p>
                                <p className="title">{user_posts_count}元</p>
                              </div>
                           
                            <div className="level-item has-text-centered">
                              <a>提现申请</a>
                            </div>
                          </nav>
                  </div>
                </article>
              </div> */}
            </div>
            <div className="tile is-info is-parent">
              <article className="tile is-child notification">
                <div className="content">
                  <p className="title">我的收藏</p>
                  <div className="content">
                  {"功能完善中"}
                  </div>
                </div>
              </article>
              
            </div>
            
          </div>
      </Layout>
      
    )
    
  }
}
