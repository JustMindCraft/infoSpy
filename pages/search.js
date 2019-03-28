import Layout from "../components/Layout";

export default class SearchPage extends React.Component{
  render(){
    return (
      <Layout>
        <form >
            <div className="field section">
              <div className="control">
                  <input autoFocus className="input"  type="text" placeholder="搜索：　标题　| 内容　| 标签" />
              </div>
          </div>
        </form>
        <section className="section">
        <div>
          <h2>标题：</h2>
        </div>
        <div>
          <h2>标签:</h2>
        </div>
        <div>
          <h2>内容:</h2>
        </div>
        </section>
       
      </Layout>
      
    )
  }
}
