import Layout from "../components/Layout";
import getBrowserGun from "../gunDB/browser";
import Link from 'next/link';

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
    }
  }
  async componentDidMount(){
    if(window){
      const username = window.localStorage.getItem("user_username");

      const instance = getBrowserGun(window);
      const { gun } = instance;
     
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
      await this.listPosts(5, "published");
      await this.listPosts(5, "draft");
      
     
    }
  }

  listPosts = async (pagesize, status) => {
    if(window){
      const username = window.localStorage.getItem("user_username");
      const instance = getBrowserGun(window);
      const { RootNode } = instance;
      const posts_count = await RootNode.get("posts_count");
      const statusPosts = this.state[status];
      let limit = pagesize;
      RootNode.get("posts")
      .map(
        post => {
          if(!post){
            limit++;
            return undefined;
          }
          if(!post.id){
            limit++;
            return undefined;
          }
          if(!post.title){
            limit++;
            return undefined;
          }
          if(post.status!==status){
            limit++;
            return undefined;
          }
          if(post.id>=posts_count-limit && post.id<=posts_count && post.author===username){
            if(limit>=pagesize){limit--}
            return post;
          }
          return undefined;
        }
      ).once((data,key)=>{
        statusPosts.unshift(data);
        const state = {};
        state[status] = statusPosts;
        this.setState(state);

        
      })
    }
  }

  render(){
    const { username, statusNote, nikel, isSuper, published, draft } = this.state;
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
                      <button className="button is-link is-outlined is-fullwidth">
                        查看更多
                      </button>
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
                      <button className="button is-link is-outlined is-fullwidth">
                        查看更多
                      </button>
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
                              <a>网站设置</a>
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
                                <p className="title">3,456</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">收藏</p>
                                <p className="title">123</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">粉丝</p>
                                <p className="title">456K</p>
                              </div>
                            </div>
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">文章浏览量</p>
                                <p className="title">789</p>
                              </div>
                            </div>
                          </nav>
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-info is-parent">
              <article className="tile is-child notification">
                <div className="content">
                  <p className="title">我的收藏</p>
                  <div className="content">
                  ...
                  </div>
                </div>
              </article>
            </div>
          </div>
      </Layout>
      
    )
    
  }
}
