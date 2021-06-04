
const {mongoClient,dbUrl}=require('./Require')

async function findUser(email){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const users= await db.collection("users").findOne({email});
            client.close();
            return users;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function createUser(email,name,password,confirmed){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const users= await db.collection("users").insertOne({email,name,password,confirmed})
            client.close();
            return users;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function confirmUser(email){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const users= document=await db.collection("users").findOneAndUpdate({email},{$set:{confirmed:1}});
            client.close();
            return users;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0
    }
    
}
module.exports={findUser,createUser,confirmUser}