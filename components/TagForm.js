class TagForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags: [],
            text: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        const { tags, text} = this.state;
        if(text===""){
            return false;
        }
        tags.push(text);
        this.setState({
            tags,
            text: "",
        });
        if(this.props.getTags){
            this.props.getTags(tags);
        }
    }
    handleTextChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        this.setState(
            {
                text: e.target.value,
            }
        )
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props, nextProps);
        
        if(this.props.tags.length!==nextProps.tags.length){
            this.setState({
                tags: nextProps.tags
            })
        }
        
    }

    componentDidMount(){
        // this.setState({
        //     tags: this.props.tags
        // })
    }
    handleDelete = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        const { tags } = this.state;
        const changeTags = [
            ...tags.slice(0,index),
            ...tags.slice(index+1, tags.length)
        ]
        if(this.props.getTags){
            this.props.getTags(tags);
        }
        this.setState({
            tags: changeTags,
        })
        
        
    }
    render(){
        const { tags, text } = this.state;
        return (
                <form onSubmit={this.handleSubmit}>
                <div className="field section" style={{width: "50%"}}>
                        <label className="label">标签</label>
                        <div className="control" style={{display: 'flex'}}>
                            <input value={text} className="input" type="text" placeholder="为文章添加标签"  onChange={this.handleTextChange} />
                            <button type="button" type="submit" className="button">添加</button>
                            
                        </div>
                    </div>
                    <section>
                        {
                            tags.map((tag, index)=>
                                <div key={index} className="tag is-info" style={{margin: 10}}>
                                    {tag}
                                <button onClick={e=>this.handleDelete(e, index)} type="button" className="delete is-small"></button>
                                </div>
                            )
                        }
                      
                    </section>
                </form>
                    
        )
    }
}

export default TagForm;