import Head from 'next/head';
import './Layout.css';
import Link from 'next/link';

export default (props) => {
    return (
       <React.Fragment>
      
        <Head>
            <title>灰机网</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" integrity="sha256-8B1OaG0zT7uYA572S2xOxWACq9NXYPQ+U5kHPV1bJN4=" crossOrigin="anonymous" />
        </Head>
        <nav className="level container">
       
            <div className="level-left">
                <div className="level-item">
                <p className="subtitle is-5">
                    <Link href="/">灰机网</Link>
                </p>
                </div>
                <div className="level-item">
                </div>
            </div>

            <div className="level-right">
                <p className="level-item"><Link href="/search">搜索</Link></p>
                <p className="level-item"><Link href="/posts">文章</Link></p>
                <p className="level-item"><Link href="/recommend">推荐</Link></p>
                <p className="level-item"><Link href="/discover">发现</Link></p>
                <p className="level-item"><Link href="/musics">音乐</Link></p>
                <p className="level-item"><Link href="/hot">热门</Link></p>
                <p className="level-item"><Link href="/about">关于</Link></p>
                <p className="level-item"><Link href="/admin">管理主页</Link></p>
                <p className="level-item"><Link href={`/admin?page=sucai`} >sucai</Link></p>
            </div>
           
            </nav>
       
         <div className="container"　style={{
             width: "100%",
             overflowY: 'auto'
         }}>
        
            {props.children}
           
        </div>
        
        </React.Fragment>
    )
}