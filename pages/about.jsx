import Layout from "../components/Layout";
import getBrowserGun from "../gunDB/browser";

export default class AboutPage extends React.Component {
  async componentDidMount(){
    const instance = getBrowserGun(window);
    const { RootNode } = instance;
    RootNode.get("videos").on((data,key)=>{
      console.log(key, data);
      
    })
    
  }
  render(){
    return (
      <Layout>
            <h1 className="title is-3">
              关于本站：
            </h1>
            <div className="content has-text-centered">
                <p className="content has-text-centered">
                由 <a href="https://github.com/JustMindCraft">正觉工场</a>创造——
                <a href="https://github.com/JustMindCraft/infoSpy.git">代码已经开源MIT is licensed </a>——
                <a href="mailto:simontaosim@protonmail.com?subject=ccc&body=xxx%0d%0ayyy">simontaosim@protonmail.com</a><br/>
                联系我们，部署您自己的区块链项目
                </p>
            </div>
            
            <section className="section">
              <h2 className="title is-4">
                １．这是一个保有互联网的资源的网站
              </h2>
              <div>
                随着时间的推移，人们并不是掌握了很多的知识和智慧，而是越来越少，巨头们使用人工智能和大数据分析，精准地给你推送你认为你想要看到的东西，人们正在变得同质化。
                这个网站的尚未完成。但是它的愿景就是为您提供不一样的东西，并且让互联网回归分享的本质。
                <br/>
                <br/>
                在我们完成内容测试后，我们之后会完善更多分布式的功能，把电驴和快播穿越到当今的移动web时代中来, 并且迎接IPV6和5G的点对点通讯的快车！<br/>
                当然会保证一切都是合法的：我们会把各类技术开源出来，所有客户端和加密算法所见及所得，跨国界的，没有服务器，没有公司，没有个体负责人，也没有组织。
                <br/>
                一些不合时宜的内容，可以加密后，深切地存储在网络中，这就保有了互联网，信息永不消失，而信息总会有用的。
                <br/>
                垄断的流量不能带来希望，知识的多样性才是创造力的源泉。
                <br/>
                <br/>
                所幸的是，一个智能设备和一台服务器在技术上没有太大的区别。
              </div>
            </section>

            <section className="section">
              <h2 className="title is-4">
                ２．这是一个隐私和安全的网站
              </h2>
              <div>
                  您确信您是个好人，无事不可对人言，您也许不需要隐私，在各种需要注册信息的场合下随意就交代了自己的私有信息，而且从来不看隐私条款。这样的您，恭喜您，您确实为人工智能大数据系统的建设提供了养分和力量，同时您也享受数字化时代的便捷。
                  而然失去隐私对您个人有以下负面风险：<br />
                  <div className="content">
                  <ol>
                    <li>有被出卖信息的风险</li>
                    <div>不管恶意地还是无意地，黑客或者系统内部都会泄露用户信息并且加以利用。</div>
                    <li>有被深度欺骗的风险</li>
                    <li>有被系统谬误牵连的风险</li>
                    <li>有过分依赖某个公司的风险</li>
                  </ol>
                  </div>
                  

                <br/>
                <br/>
                数字时代，我们怎样避免变成一个数字？
              </div>
            </section>

            <section className="section">
              <h2 className="title is-4">
                ３．完全使用区块链和分布式技术打造的网站
              </h2>
              <div>
                尽管目前这个网站是托管在服务器上，人们打开网页，输入网址，对其进行中心化的访问，
                但是我们的数据，节点以及用户资料的都是加密分布存储在地球的不同角落里，
                也许您的浏览器也帮助我们备份了部分数据，并且贡献了计算资源。
                但是不用担心您的设备被利用，我们在不同网站的上的用户数以亿万计，我们自己也搭建了强而有力的主节点，一般来说普通用户消费的资源要远远超过其贡献的资源。

                <br/>
                <br/>
                之后，我们也会提供可供现在客户端兼容主流平台: windows mac linux android ios, 使得我们网络真正去中心化。
              </div>
            </section>
           
            
      </Layout>
    )
  }
}
  
  

