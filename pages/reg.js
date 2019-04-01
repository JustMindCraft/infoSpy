import Layout from "../components/Layout";
import Link from 'next/link';
import getBrowserGun from "../gunDB/browser";


export default class RegPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
      usernameValid: true,
      usernameHelperText: "",
      passwordValid: true,
      passwordHelperText: "",
      passwordRepeatValid: true,
      usernameHelperText: "",
      registering: false,
    }
  }

  async componentDidMount(){
    // const instance = getBrowserGun(window);
    // const { RootNode, gun } = instance;
    // const user = gun.user();
    // user.auth("username5", "123123", ack => {
    //   console.log(ack);
      
    // })
  }


  async validUsername(username){
    const instance = getBrowserGun(window);
    const { gun } = instance;
    const usernameExist = await gun.get("user/"+username).get("is_exist");
    if(usernameExist){
      return this.setState({
        usernameValid: false,
        usernameHelperText: "用户名已经存在"
      })
    }
    gun.get("users")
    .map(user=>(user && user.username === username)? user : undefined)
    .once((data,key)=>{
      if(data){
        return this.setState({
          usernameValid: false,
          usernameHelperText: "用户名已经存在"
        })
      }
    })
    const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!uPattern.test(username)){
      return this.setState({
        usernameValid: false,
        usernameHelperText: "用户名规则：4到16位（字母，数字，下划线，减号）"
      })
    }
    this.setState({
      usernameValid: true,
      usernameHelperText: "恭喜用户名可用"
    })
  }

  validPassword(password){
    const pPattern = /^[a-zA-Z0-9_-]{6,16}$/;
    if(!pPattern.test(password)){
      return this.setState({
        passwordValid: false,
        passwordHelperText: "密码规则：6到16位（字母，数字，下划线，减号）"
      })
    }
    this.setState({
      passwordValid: true,
      passwordHelperText: "密码可用"
    })
  }

  validPasswordRepeat(passwordRepeat){
    const { password } = this.state;
    if(password!==passwordRepeat){
      return this.setState({
        passwordRepeatValid: false,
        passwordRepeatHelperText: "二次密码输入不一样"
      })
    }
    return this.setState({
      passwordRepeatValid: true,
      passwordRepeatHelperText: "二次密码一致"
    })
  }

   handleChange = async (field, e) => {
      const newState ={};
      newState[field] = e.target.value;
      this.setState(newState);
      
      if(field==="username"){
        const username  =  newState[field];
        await this.validUsername(username);
      }
      if(field==="password"){
        const password  =  newState[field];
        this.validPassword(password);
      }
      if(field==="passwordRepeat"){
        const passwordRepeat  =  newState[field];
        this.validPasswordRepeat(passwordRepeat);
      }
  }



  handleSubmit =  async (e) => {
    e.preventDefault();
    const {username, password, passwordRepeat, usernameValid, passwordValid, passwordRepeatValid} = this.state;
    if(username===""){
      return this.setState({
        usernameValid: false,
        usernameHelperText: "用户名不得为空"
      })
    }
    if(password===""){
      return this.setState({
        passwordValid: false,
        passwordHelperText: "密码不得为空"
      })
    }
    if(password !== passwordRepeat){
      return this.setState({
        passwordRepeatValid: false,
        passwordRepeatHelperText: "二次密码输入不一样"
      })
    }
    if(usernameValid && passwordValid && passwordRepeatValid){
      return await this.reg(username, password)
    }
    return false;
   
    
  }
  reg = async (username, password) => {
    this.setState({
      registering: true,
    })
    const instance = getBrowserGun(window);
    const { gun } = instance;
    const usernameExist = await gun.get("user/"+username).get("is_exist");
    //再次检查，以防止被抢注
    if(usernameExist){
      return this.setState({
        usernameValid: false,
        usernameHelperText: "用户名已经存在",
        registering: false,
      })
    }
      let userCount = await gun.get("users_count").get("count");
      if(!userCount){
          userCount = 0;
      }
     
      await gun.get("users_count").get("count").put(userCount+1);
      await gun.get("user/"+username).get("is_exist").put(true);
      console.log("名字注册成功");
      gun.get("users").get(userCount+1).put({
          "username": username, 
          "isSuper": true,
          "host": window.location.host,
          "id": userCount+1,
      }, ack=>{
        console.log(ack);
        const user = gun.user();
        user.create(username, password, async ack => {
          console.log(ack);
          
          this.setState({
            registering: false,
          });
          if(ack.ok===0){
            window.location.assign("/login");
            alert("注册成功！");
            
          }else{
            alert(ack, "注册出错")
          }
          
        });
      });
     
   
    
  }
  

  render(){

    const { username, password, 
      passwordRepeat, usernameValid,
       usernameHelperText,
       passwordValid, passwordHelperText,
       passwordRepeatValid, passwordRepeatHelperText,
       registering
      } = this.state;

    return (
      <Layout>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <h1 className="title">注册</h1> <br/>
        <div className="has-text-centered" style={{padding: 5}}>
            <b>注意：</b>
            本网站基于区块链技术，网站并不保存您的任何密码和所有隐私信息，采用基于密码学的自我认证。<br/>
            <b>一旦密码丢失，将没有任何办法找回，请牢记您的密码！</b>
        </div>
        <br/>
        <form style={{
          width: "80%",
          maxWidth: 600
        }} onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input disabled={registering} value={username} className="input" type="text" placeholder="用户名" onChange={e=> this.handleChange("username", e)} />
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
              <input  disabled={registering} value={password} className="input" type="password" placeholder="输入密码"   onChange={e=> this.handleChange("password", e)} />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
              <span className="icon is-small is-right">
                <i className={"fas "+ (passwordValid ?  "fa-check" : "fa-exclamation-triangle")}></i>
              </span>
              <p className={"help "+(!passwordValid? "is-danger": "is-success")}>{passwordHelperText}</p>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left  has-icons-right">
              <input  disabled={registering} value={passwordRepeat} className="input" type="password" placeholder="重复密码"  onChange={e=> this.handleChange("passwordRepeat", e)}  />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
              <span className="icon is-small is-right">
                <i className={"fas "+ (passwordRepeatValid ?  "fa-check" : "fa-exclamation-triangle")}></i>
              </span>
              <p className={"help "+(!passwordRepeatValid? "is-danger": "is-success")}>{passwordRepeatHelperText}</p>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button disabled={registering} type="submit" className={"button is-primary is-fullwidth "+ (registering? "is-loading": "")}>
                注册{registering && "中........"}
              </button>
            </p>
          </div>
          <div>
            {registering && "在一个区块链系统中，分布式注册过程可能比较缓慢，请耐心等候，我们会不断优化这部分性能"}
          </div>
        <div className="field">
            <p className="control">
            <Link href="/login">
            <a className="button is-info is-fullwidth">
                登录
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