import config from './config';

export default  function getBrowserGun(window){
    if(window.Gun){
        var opt = {};
        opt.store = RindexedDB(opt);
        opt.peers = config.hosts;
        const gun = window.Gun(opt);
        const sea = window.Gun.SEA;
        const RootNode = gun.get(window.location.host);
        const now = () => {
            return new Date((Gun).state()).getTime();
        }
        return {gun, sea, RootNode, now};
    }
    return undefined;
}


