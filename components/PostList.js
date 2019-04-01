import { getPosts } from "../api/posts";
import { isArray } from "util";
import Card from "./Card";

class PostList extends React.Component{
    

    render(){
        const { list } = this.props;
        if(!isArray(list)){
            return (
                <h1>加载中</h1>
            )
        }
        
        return (
            <section className="section" style={{
                display: 'flex',
                flexWrap: "wrap",
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: 300, height: "auto", overflowY: "hidden",
                width: "100%",
            }}>
                {
                    list.map((item, index)=>
                        <Card key={index} id={item.id} title={item.title} cover={item.cover} createdAt={item.createdAt}  visited={item.visited} noImage={this.props.noImage}/>
                        )
                }
            </section>
        )
    }
}


export default PostList;