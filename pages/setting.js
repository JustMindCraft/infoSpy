import Layout from "../components/Layout";
import getBrowserGun from "../gunDB/browser";

export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            subtitle: ""
        }
    }

    async componentDidMount(){
        if(window){
            const instance = getBrowserGun(window)
            const { RootNode } = instance;
            const title = await RootNode.get("site").get("title");
            const subtitle = await RootNode.get("site").get("subtitle");
            this.setState({
                title,
                subtitle
            })
        }
    }
    handleSubmit =  (e) => {
        e.preventDefault();
        const { title, subtitle} = this.state;
        if(!title || title ===""){
            return alert("网站名称不得为空");
        }
        const instance = getBrowserGun(window)
        const { RootNode } = instance;
        RootNode.get("site").put({
            title,
            subtitle: subtitle? subtitle:""
        }, ack=>{
            if(!ack.err){
                return alert("保存成功")
            }
            return alert("保存失败")
        })
        

    }
    handleInputChange =(e, text) => {
        if(text === "title"){
            this.setState({
                title: e.target.value,
            })
        }
        if(text === "subtitle"){
            this.setState({
                subtitle: e.target.value,
            })
        }
        
    }
    
    render(){

        const { title, subtitle } = this.state;
        return (
            <Layout>
                <div style={{
                     display: "flex",
                     alignContent: "center",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     justifyItems: "center",
                }}>
                <h1 className="title">设置您的网站</h1>
                <form style={{
                    maxWidth: 600,
                    display: "flex",
                    alignContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                    
                }} onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">网站名称</label>
                        <div className="control">
                            <input className="input" type="text" onChange={e=>this.handleInputChange(e, "title")} value={title} placeholder="e.g 比如我的博客" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">网站副标题</label>
                        <div className="control">
                            <input className="input" type="text"  onChange={e=>this.handleInputChange(e, "subtitle")} value={subtitle} placeholder="e.g.比如‘一个自由安宁之地’" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" type="submit">保存</button>
                        </div>
                    </div>
                </form>
                </div>
                
                 

            </Layout>
        )
    }
}