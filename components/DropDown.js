import Link from 'next/link';

const DownMenuList = [
    {
        label: "首页",
        href: "/"
    },
    {
        label: "搜索",
        href: "/search"
    }
]

export default () => {
   
    return (

        <div className="dropdown is-right isBottom is-hoverable">
            <div className="dropdown-trigger">
                <span style={{
                    opacity: 0,
                }} className="icon is-large">
                    {/* <i className="fas fa-2x fa-bars "></i> */}
                    {/* <i></i> */}
                </span>
               
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" style={{
                    textAlign: "center"
                }}>
                {
                    DownMenuList.map((item,index)=>
                    <div key={index} className="dropdown-item">
                        <Link href={item.href} >
                        <a>{item.label}</a>
                        </Link>
                    </div>
                    )
                }
                   
                    <hr className="dropdown-divider" />
                    <div className="dropdown-item">
                    <Link href="/login"  >
                        <a>登录</a>
                    </Link>
                    </div>
                    <div className="dropdown-item">
                    <Link href="/reg" >
                        <a>注册</a>
                    </Link>
                    </div>
                   
                    <hr className="dropdown-divider" />
                    <div className="dropdown-item">
                    <Link href="/about" >
                        <a>关于</a>
                    </Link>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}