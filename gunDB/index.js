const config = require('./config.js');
const Gun = require("gun");
require('browserfs')
require('gun/lib/radix.js');
require('gun/lib/radisk.js');
// require('gun/lib/store.js'); 
require('gun/lib/rindexed.js');
require('gun/sea');
require('gun/nts');



const gun = Gun(config.hosts);
const sea = Gun.SEA;
const RootNode = gun.get(config.rootId);
const now = () => {
    return new Date((Gun).state()).getTime();
}

module.exports = {
    sea,
    gun,
    RootNode,
    now
}

