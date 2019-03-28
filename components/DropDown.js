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
                    <a  className="dropdown-item">
                       首页
                    </a>
                    <a className="dropdown-item">
                       搜索
                    </a>
                    <a  className="dropdown-item ">
                        文章
                    </a>
                    <a  className="dropdown-item ">
                        推荐
                    </a>
                    <a  className="dropdown-item ">
                        发现
                    </a>
                    <a  className="dropdown-item ">
                        音乐
                    </a>
                    <a  className="dropdown-item ">
                        热门
                    </a>
                   
                    <hr className="dropdown-divider" />
                    <a  className="dropdown-item">
                        登录
                    </a>
                    <a  className="dropdown-item">
                        注册
                    </a>
                    <hr className="dropdown-divider" />
                    <a  className="dropdown-item">
                        关于
                    </a>
                    
                </div>
            </div>
        </div>
    )
}