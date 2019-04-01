
import getBrowserGun from "../gunDB/browser";
 
async function reg(username, password){
    const instance = getBrowserGun(window)
    const { RootNode } = instance;
    const usernameIsExist = await RootNode.get("user/"+username);
    let userCount = await RootNode.get("users_count");
    if(!userCount){
        userCount = 0;
    }
    
    if(usernameIsExist){
        console.log("user exist");
        
        return username+"_already_token";
    }
    const salt = Math.random();
    const pair = await sea.pair();
    console.log(pair);
    
    const proof = await sea.work(password, salt);
    const auth = await sea.encrypt(pair, proof);
    const uuid = require("uuid/v4")();
    const message = await sea.sign(uuid, pair);

    console.log(message);
    
    await RootNode.get("user_auth_msg/"+username).put(message);
    await RootNode.get("users/auth").get(username).put(auth);
    await RootNode.get("users/salt").get(username).put(salt);
    await RootNode.get("user/"+username).put(true);
    await RootNode.get("users").get(username).put({
        username, auth,
        isSuper: userCount === 0? true: false,
    });
    await RootNode.get("users_count").put(userCount+1);
}

async function auth(username, password){
    const instance = getBrowserGun(window)
    const { RootNode } = instance;
    const auth =  await RootNode.get("users/auth").get(username);
    console.log(auth);
    
    const salt = await RootNode.get("users/salt").get(username);
    console.log(salt);
    
    const login = await sea.work(password, salt);
    const keys = await sea.decrypt(auth, login);
    console.log(keys);
    
    const message = await RootNode.get("user_auth_msg/"+username);
    
    const authRlt = await sea.verify(message, keys.pub);
    if(authRlt){
        return keys.pub;
    }

    return false;
    
}

async function isAuthed(token){

}

async function test(){
    // var pair = await sea.pair(); // generate a new key pair
    // console.log(pair);
    // var alias = "alice"
    // var pass = "secret";
    // var salt = 1; // random
    // var proof = await sea.work(alias, pass); // don't do this! (pass, salt) instead!
    // var auth = await sea.encrypt(pair, proof);
    // console.log(auth); // data saved in a cryptographically linked user graph
    // // now on another machine...
    // var login = await sea.work(alias, pass);
    // var keys = await sea.decrypt(auth, login); // encrypted auth loaded from graph
    // console.log(keys); // equal to the original key pair
    await reg("simon", "123666");
    await auth("simon", "123666");
}

test();
