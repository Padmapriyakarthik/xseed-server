const {mongoClient,dbUrl, objectId}=require('./Require')


async function totalDataCount(team,season){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            var filters={}
            if(season && team){
                filters.$and=[{
                    $or:[{"team1":team},{"team2":team}]
                },{"season":season}]
            }else if(season){
                filters.season=season;
            }else if(team){
                filters.$or=[{"team1":team},{"team2":team}]
            }
            const db = client.db("cricket");
            
            const count= await db.collection("matches").countDocuments(filters);
            
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

async function getMatchList(page,limit,season,team){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            var filters={}
            if(season && team){
                filters.$and=[{
                    $or:[{"team1":team},{"team2":team}]
                },{"season":season}]
            }else if(season){
                filters.season=season;
            }else if(team){
                filters.$or=[{"team1":team},{"team2":team}]
            }
            var all= await db.collection("matches").find(filters).project({_id:1,season:1,city:1,date:1,venue:1,team1:1,team2:1});
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

async function getSeason(){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const season= await db.collection("matches").distinct("season");
            client.close();
            return season;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function getTeam(){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const team= await db.collection("matches").distinct("team1");
            client.close();
            return team;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function getvenue(){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            const venue= await db.collection("matches").distinct("venue");
            client.close();
            return venue;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}

async function headprediction(team1,team2){
    const client = await mongoClient.connect(dbUrl);
    if(client){
        try {
            const db = client.db("cricket");
            var filters={};
            filters.$or=[{
                $and:[{"team1":team1},{"team2":team2}]
            },{$and:[{"team1":team2},{"team2":team1}]}]
            const predict= await db.collection("matches").find(filters).project({winner:1,result:1,_id:0}).toArray();
            
            client.close();
            return predict;
        }catch(error){
            console.log(error);
            client.close();
        }
    }else{
        return 0;
    }
}
module.exports={totalDataCount,getMatchList,getMatchdetail,getSeason,getTeam,getvenue,headprediction}