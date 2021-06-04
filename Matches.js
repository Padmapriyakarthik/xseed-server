const {mongoClient,dbUrl, objectId}=require('./Require')

async function totalDataCount(){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const count= await db.collection("matches").countDocuments();
            client.close();
            return count;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function getMatchList(page,limit){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            var all= await db.collection("matches").find().project({_id:1,season:1,city:1,date:1,venue:1,team1:1,team2:1}).sort({"season":-1});
            page=page ?parseInt(page):1;
            limit= limit ? parseInt(limit):2;
            let skip=(page-1)*limit;

            all=await all.skip(skip).limit(limit);
            const all_matches=await all.toArray();
            client.close();
            return all_matches;
        }
        catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function getMatchdetail(id){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            var detail= await db.collection("matches").findOne({_id:objectId(id)});
            client.close();
            return detail;
        }
        catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}


module.exports={totalDataCount,getMatchList,getMatchdetail}