const {totalDataCount,getMatchList, getMatchdetail, getSeason ,getTeam}=require('./Matches');

const totalCount=async(req,res)=>{
    try{
        const count=await totalDataCount();
        if(count){
            res.status(200).json({count});
        }else{
            res.status(400).json({error:"something went wrong"});
        }
    }catch(error){
        console.log(error);
    }
}

const matchList=async(req,res)=>{
    try{
        const {limit}=req.query;
        const {page}=req.query;
        if((limit))
        {
            if(isNaN(limit)){
                res.status(400).json({"error":"Limit is invalid"})
                return ;
            }else if((limit>99) || (limit<=0)){
                res.status(400).json({"error":"Limit should be in the range of  1 to 99"})
                return ;
            }
        } 
        if((page) &&(isNaN(page))){
            res.status(400).json({"error":"Page is invalid"})
            return ;
        }
        const list=await getMatchList(page,limit);
        if(list){
            res.status(200).json({list});
        }else{
            res.status(400).json({"error":"Something went wrong"})
        }
    }catch(error){
        console.log(error);
    }
}

const getDetail=async(req,res)=>{
    try{
        const {id}=req.params;
        const get_detail=await getMatchdetail(id);
        const detail=await generatedetail(get_detail);
        res.status(200).json({detail});
        console.log(detail);
    }catch(error){
        console.log(error);
    }
}
const generatedetail=async (detail)=>{
    try{
        if(detail.result=="tie"){
            detail.winner=" ";
        }
        else if(detail.win_by_runs){
            detail.result="won by "+detail.win_by_runs+" runs";
        }else if(detail.win_by_wickets){
            detail.result="won by "+detail.win_by_wickets+" wickets";
        }
        return detail;
    }catch(error){
        console.log(error);
    }
}

module.exports={totalCount,matchList,getDetail}