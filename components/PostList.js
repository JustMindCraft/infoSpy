import { isArray } from "util";
import Card from "./Card";

class PostList extends React.Component{
    

    render(){
        const { list } = this.props;
        
        console.log(this.props.adding);
        
        if(!isArray(list)){
            return (
                <h1>加载中</h1>
            )
        }
        
        return (
            <section onScroll={this.props.handleOnScroll} className="section" style={{
                display: 'flex',
                flexWrap: "wrap",
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                height: "90%", overflowY: "auto",
                padding: 1,
                width: "100%",
                minHeight: "310px"
            }}>
                {   this.props.adding && 
                     <div  className="card has-text-centered blue" style={{
                        maxWidth: 365,
                        margin: 10
                    }}>加载更多中......</div>
                }
                {
                    list.map((item, index)=>
                        <Card key={index} id={item.id} title={item.title} cover={item.cover} createdAt={item.createdAt}  visited={item.visited} noImage={this.props.noImage}/>
                        )
                }
                {   this.props.adding && 
                     <div  className="card has-text-centered blue" style={{
                        maxWidth: 365,
                        margin: 10
                    }}>加载更多中......</div>
                }
            </section>
        )
    }
}


export default PostList;