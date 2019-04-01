import TextEditor from "../components/TextEditor";
import TagForm from "./TagForm";
import getBrowserGun from "../gunDB/browser";

const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';

class PostForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags: [],
            title: "",
            body: "",
            id: null,
            cover: "https://bulma.io/images/placeholders/480x480.png",
            imageUploading: false,
            imageName: "",
            saving: false,
            recommend: false,
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

    async componentDidMount(){
        if(window){
            const instance = getBrowserGun(window);
            const { RootNode } = instance;
            RootNode.get("posts").map(
                post => {
                    if(!post){
                        return false;
                    }
                    if(post.title==="test12"){
                        return post;
                    }
                    return undefined;
                }
            ).once( async (data,key)=>{
                console.log(data,key);
                const tagCount = await  RootNode.get("post_tag_count/"+data.id);
                console.log(tagCount);
                
                
            })
        }
    }

   

   
    uploadFile = (file) => {
        const { message } = this.props;
        this.setState({
            uploading: true,
        })
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.upload.addEventListener("progress", (e) => {
            const progress = Math.round((e.loaded * 100.0) / e.total);
            console.log(`fileuploadprogress data.loaded: ${e.loaded},
             data.total: ${e.total}`);
             console.log(progress);
        });
        xhr.onreadystatechange = (e) => {
            if(xhr.status != 200){
              alert('图片上传失败，请稍后再试');
              return this.setState({
                imageUploading: false,
                })
             
             
            }
            if (xhr.readyState == 4 && xhr.status == 200) {
  
              const response = JSON.parse(xhr.responseText);
              
              const { secure_url } = response;
              //上级组件获取图片地址
                 this.setState({
                    imageUploading: false,
                    cover: secure_url,
                });
              
            }
  
            
          };
        
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }

    handleFileChange = e => {
        this.setState({
            imageUploading: true,
        })
        const extensionValid = /[.](jpg|gif|bmg|png)$/;
        const alertText = '格式不正确,支持jpg|gif|bmg|png';
        const files = e.target.files;
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if(!extensionValid.test(file.name)){
               this.setState({
                    imageUploading: false,
                    imageName: file.name,
                })
                return alert(alertText);
            }else{
                this.setState({
                    imageName: file.name,
                })
                this.uploadFile(file);
            }
        }
    }
    getEditorText = text => {
        this.setState({
            body: text,
        })
        
    }
    putPost = async (post, tags) => {
        if(post.title===""){
            this.setState({
                saving: false,
            })
            alert("必须输入标题");
            return false;
        }
        if(window){
            const instance = getBrowserGun(window);
            const { RootNode, now } = instance;
            let posts_count = await RootNode.get("posts_count");
            if(!posts_count){
                posts_count=0
            }
            let id = posts_count+1;
            let createdAt = now();
            if(post.id){
                //更新操作
                id = post.id;
                createdAt = post.createdAt;
            }
            this.setState({
                id,
            })
            
            RootNode.get("posts").get(id).put({...post, id, createdAt, updatedAt: now()}, ack=>{
                if(ack.err){
                    this.setState({
                        saving: false,
                    })
                    return alert("存储文章失败，检查网络，再重试");
                }
                RootNode.get("posts_count").put(id+1, async ack=>{
                    if(ack.err){
                        this.setState({
                            saving: false,
                        })
                        return alert("存储文章失败，检查网络，再重试");
                    }
                    //开始存储tags
                    
                    for (let index = 0; index < tags.length; index++) {
                        const tag = tags[index];
                        let tags_count = await RootNode.get("tags_count");
                        if(!tags_count){
                            tags_count= 0
                        }
                        const tagId = tags_count+1;
                        await  RootNode.get("post_tags").get(tagId).put({
                            tag,
                            postId: id,
                            tagId,
                        })
                        await RootNode.get("tag_posts").get(id).put({
                            tag,
                            postId: id,
                            tagId,
                        })
                        if(!(await RootNode.get("tag_exists/"+tag))){
                            await RootNode.get("tags").get(tagId).put({
                                name: tag,
                                id: tagId,
                            })
                        }
                        let tag_post_count = await RootNode.get("tag_post_count/"+tag);
                        if(!tag_post_count){
                            tag_post_count = 0;
                        }
                        await RootNode.get("tag_post_count/"+tag).put(tag_post_count+1);
                    }
                    await RootNode.get("post_tag_count/"+id).put(tags.length);
                    
                    this.setState({
                        saving: false,
                    })
                    if(post.status === "published"){
                        return alert("文章发布成功！");
                    }
                    return alert("草稿保存成功！");
                })
            })
              
        }
        
    }
    getPostData = () => {
        const { title, cover,  body, id, recommend }  = this.state;
        const post = {};
        post.title = title;
        post.cover = cover;
        post.body = body;
        post.id = id;
        post.author=window.localStorage.getItem("user_username");
        post.recommend = recommend;
        return post;
    }
    publish = () => {
        const { tags } = this.state;
        const post = this.getPostData();
        post.status = "published";
        this.setState({
            saving: true,
        })
        this.putPost(post, tags);

    }

    save = async () => {
        const { tags } = this.state;
        const post = this.getPostData();
        post.status = "draft";
        this.setState({
            saving: true,
        })
        await this.putPost(post, tags);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        await this.save();
    }
    handleRecommend  = (e, recommend) => {
       this.setState({
           recommend: recommend
       })
        

    }

   
  

    render(){
        const { title, imageName, cover, imageUploading,  body, saving, recommend }  = this.state;
        
        return (
            <form onSubmit={this.handleSubmit}>
                     <div className="field section">
                        <label className="label">标题</label>
                        <div className="control">
                            <input  className="input" value={title} type="text" placeholder="请输入标题" onChange={this.handleTitleChange}/>
                        </div>
                    </div>
                    <div className="field section">
                        <div className="control">
                        <div className="file has-name is-fullwidth">
                            <label className="file-label">
                                <input onChange={this.handleFileChange}  multiple={false} className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    {imageUploading? "正在上传": "上传封面"}
                                </span>
                                </span>
                                <span className="file-name">
                                {imageName}
                                </span>
                            </label>
                            </div>
                        </div>
                    </div>
                    <div className="section" style={{display: "flex", justifyContent: "center"}}>
                    <figure className="image">
                        <img src={cover}/>
                    </figure>
                    </div>
                   
                    <TagForm  getTags={this.getTags}/>
                    <div className="field section">
                    <div className="control">
                        <label className="radio">
                        <input onClick={(e)=> this.handleRecommend(e, true)}  type="radio" name="question" checked={recommend} />
                        推荐
                        </label>
                        <label className="radio">
                        <input onClick={e=>this.handleRecommend(e, false)} type="radio" name="question" checked={!recommend} />
                        不推荐
                        </label>
                    </div>
                    </div>

                    <div className="field section">
                    <label className="label">正文编辑</label>
                    <div className="control">
                        <TextEditor value={body} getEditorText={this.getEditorText}/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    </div>

                    <div className="field is-grouped section" style={{
                        position: 'fixed',
                        bottom: "15%",
                        zIndex: 9988,
                    }}>
                   
                    <div className="control">
                        <button onClick={this.publish} disabled={saving} type="button" className={"button is-link"+(saving? " is-loading": "")}>发布</button>
                    </div>
                    <div className="control">
                        <button disabled={saving} type="submit"  className={"button is-link"+(saving? " is-loading": "")}>保存草稿</button>
                    </div>
                    </div>
            </form>
        )
    }
}

export default PostForm;