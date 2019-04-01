import Layout from "../components/Layout";
import Loader from "../components/Loader";

export default class Logout extends React.Component {

    componentDidMount(){
        if(window){
            window.localStorage.removeItem("user_id");          
            window.localStorage.removeItem("user_host");          
            window.localStorage.removeItem("user_is_super");          
            window.localStorage.removeItem("user_username"); 
            setTimeout(() => {
                window.location.assign("login");
            }, 1234);
        }
       
    }
    render(){
        return (
            <Layout>

                <div className="has-text-contered title">
                    <Loader />
                    正在登出
                </div>
            </Layout>
        )
    }
}