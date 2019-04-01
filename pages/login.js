import Layout from "../components/Layout";
import Link from 'next/link';
import getBrowserGun from "../gunDB/browser";


export default class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameValid: true,
      usernameHelperText: "",
      passwordValid: true,
      passwordHelperText: "",
      logining: false,
    }
  }
  handleChange = async (field, e) => {
    const newState ={};
    newState[field] = e.target.value;
    this.setState(newState);
  }

   handleSubmit = async e => {
    e.preventDefault();
    const instance = getBrowserGun(window);
    const { username, password } = this.state;
    if(username===""){
      return this.setState({
        usernameValid: false,
        usernameHelperText: "用户名不得为空"
      })
    }
    if(password === ""){
      return this.setState({
        passwordValid: false,
        passwordHelperText: "密码不得为空"
      })
    }
    this.setState({
      logining: true,
    })
    const { gun } = instance;
    const user = gun.user();
    console.log(password);
    
    user.auth(username, password, auth=>{
      
      if(auth.err){
        alert("用户名或者密码错误");
        return this.setState({
          logining: false,
        })
      }
      if(auth.put.alias === username){
       
        this.setState({
          logining: false,
        })
        gun.get("users").map(
          item => {
            if(!item){
              return undefined;
            }
            if(item.username === username){
              return item;
            }
            return undefined;
          }
         
        ).once((data,key)=>{
          window.localStorage.removeItem("user_id");          
          window.localStorage.removeItem("user_host");          
          window.localStorage.removeItem("user_is_super");          
          window.localStorage.removeItem("user_username"); 
          window.localStorage.setItem("user_id", key);          
          window.localStorage.setItem("user_host", data.host);          
          window.localStorage.setItem("user_is_super", data.isSuper);          
          window.localStorage.setItem("user_username", data.username); 
          window.location.assign("/dashboard");
          alert("登录成功");  

        })
        
      }
      
    })
  }

  render(){

    const { username, password, usernameValid, usernameHelperText, passwordValid, passwordHelperText,logining} = this.state;

    return (
      <Layout>
        <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h1 className="title">登录</h1> <br/>
            
            <br/>
            <form action="#" style={{
              width: "80%",
              maxWidth: 600
            }} onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input disabled={logining} value={username}  className="input" type="text" placeholder="用户名" onChange={e=>this.handleChange("username", e)}/>
                  <span className="icon is-user is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className={"fas "+ (usernameValid ?  "fa-check" : "fa-exclamation-triangle")}></i>
                  </span>
                  <p className={"help "+(!usernameValid? "is-danger": "is-success")}>{usernameHelperText}</p>
                </div>
               
              </div>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input disabled={logining} value={password}  className="input" type="password" placeholder="密码" onChange={e=>this.handleChange("password", e)} />
                  <span className="icon is-lock is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className={"fas "+ (passwordValid ?  "fa-check" : "fa-exclamation-triangle")}></i>
                  </span>
                  <p className={"help "+(!passwordValid? "is-danger": "is-success")}>{passwordHelperText}</p>
                </div>
              </div>
              <div className="field">
                <p className="control">
                <button type="submit" className={"button is-primary is-fullwidth"+ (logining? " is-loading": "")}>
                    登录
                  </button>
                </p>
            </div>
            <div className="field">
                <p className="control">
                <Link href="/reg">
                <a className="button is-info is-fullwidth">
                    注册
                  </a>
                </Link>
                 
                </p>
            </div>
            </form>
        </div>
      </Layout>
      
    )
    
  }
}