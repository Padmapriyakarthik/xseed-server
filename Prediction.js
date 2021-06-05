const {headprediction}=require('./Matches');

const predict=async(req,res)=>{
    try{
        const {team1}=req.query;
        const {team2}=req.query;
        const {Venue}=req.query;
        const {batteam}=req.query;
        if(team1=="" || team2=="" || Venue=="" || batteam=="")
        {
                res.status(400).json({"error":"Input is invalid"})
                return ;
        } 
        const list=await headprediction(team1,team2);
        const result=await generatePrediction(list,team1,team2);
        if(result){
            res.status(200).json({result});
        }else{
            res.status(400).json({"error":"Something went wrong"})
        }
    }catch(error){
        console.log(error);
    }
}
function generatePrediction(list,team1,team2){
    try{
        let team1count=0,team2count=0,tiecount=0;;
        for(let i=0;i<list.length;i++){
            if(list[i].result=="normal"){
                if(list[i].winner==team1){
                    team1count++;
                }else if(list[i].winner==team2){
                    team2count++;
                }
            }else{
                tiecount++;
            }
        }
        let totalcount=team1count+team2count;
        let team1predict=Math.floor((team1count/totalcount)*100);
        let team2predict=Math.floor((team2count/totalcount)*100);
        var result={team1count,team2count,tiecount,team1predict,team2predict}
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}
module.exports={predict}