import Layout from "../components/Layout";

class Posts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: {}
        }
    }

    componentDidMount(){
        const queryString = require('query-string');
        const parsed = queryString.parse(window.location.search);
        console.log(parsed);
        
    }

    render(){
        return (
            <Layout>
                <h1>文章s</h1>
                <h3>{JSON.stringify(this.state.query)}</h3>
            </Layout>
        )
    }
}

export default Posts
