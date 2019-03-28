import TextEditor from "../components/TextEditor";
import TagForm from "./TagForm";

class PostForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags: [],
            title: "",
            body: "",
            id: null,
        }
    }
    getTags = (tags) => {
        this.setState({
            tags
        })
    }

    handleTitleChange= (e) =>{
        this.setState({
            title: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        const { title, body} = this.state;

        
    }

    publish = () => {

    }

    save = () => {

    }

    render(){
        const { title, tags }  = this.state;
        
        return (
            <form onSubmit={this.handleSubmit}>
                     <div className="field section">
                        <label className="label">标题</label>
                        <div className="control">
                            <input className="input" value={title} type="text" placeholder="请输入标题" onChange={this.handleTitleChange}/>
                        </div>
                    </div>
                   
                    <TagForm  getTags={this.getTags}/>
                    <div className="field section">
                    <div className="control">
                        <label className="radio">
                        <input type="radio" name="question" />
                        推荐
                        </label>
                        <label className="radio">
                        <input type="radio" name="question" checked={true} />
                        不推荐
                        </label>
                    </div>
                    </div>

                    <div className="field section">
                    <label className="label">正文编辑</label>
                    <div className="control">
                        <TextEditor />
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    </div>

                    <div className="field is-grouped section" style={{
                        position: 'fixed',
                        bottom: "0%",
                        zIndex: 9988,
                    }}>
                   
                    <div className="control">
                        <button className="button is-link">发布</button>
                    </div>
                    <div className="control">
                        <button className="button is-link">保存草稿</button>
                    </div>
                    </div>
            </form>
        )
    }
}

export default PostForm;