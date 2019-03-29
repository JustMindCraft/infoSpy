import Link from 'next/link';

export default () => {
   
    return (

        <div className="dropdown is-right is-hoverable">
            <div className="dropdown-trigger">
                <span className="icon is-large">
                    <i className="fas fa-2x fa-bars "></i>
                </span>
               
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" style={{
                    textAlign: "center"
                }}>
                    <a href="/" className="dropdown-item">
                       首页
                    </a>
                    <a href="/search" className="dropdown-item">
                       搜索
                    </a>
                    <a href="/posts?tag=前端" className="dropdown-item ">
                        前端
                    </a>
                    <a  href="/posts?tag=Android" className="dropdown-item ">
                        Android
                    </a>
                    <a href="/posts?tag=iOS" className="dropdown-item ">
                        IOS
                    </a>
                    <a href="/posts?tag=瞎推荐" className="dropdown-item ">
                        瞎推荐
                    </a>
                    <a href="/posts?tag=App" className="dropdown-item ">
                        APP
                    </a>
                    <a href="/posts?tag=福利" className="dropdown-item ">
                        妹纸
                    </a>
                   
                    <hr className="dropdown-divider" />
                    <a href="/login"  className="dropdown-item">
                        登录
                    </a>
                    <a href="/reg" className="dropdown-item">
                        注册
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="/about" className="dropdown-item">
                        关于
                    </a>
                    
                </div>
            </div>
        </div>
    )
}