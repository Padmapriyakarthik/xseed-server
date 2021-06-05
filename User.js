
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
            const favouriteteam=undefined;
            const users= await db.collection("users").insertOne({email,name,password,confirmed,favouriteteam})
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

async function updateTeam(email,favouriteteam){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const users= document=await db.collection("users").findOneAndUpdate({email},{$set:{favouriteteam}});
            
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

async function removeFavourite(email){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const users= document=await db.collection("users").findOneAndUpdate({email},{$set:{favouriteteam:undefined}});
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
module.exports={findUser,createUser,confirmUser,updateTeam,removeFavourite}