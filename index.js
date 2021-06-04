const express=require('express');
const app=express();
app.use(express.json());

const cors=require('cors');
app.use(cors());


require('dotenv').config();

const { signUp, activateToken, signIn } = require('./AccountManager');
const { totalCount, matchList, getDetail , seasonlist,teamList} = require('./MatchManager');

const {authenticate}=require('./Authenticate')
const port=/*process.env.PORT ||*/ 4000;

app.post("/signup",signUp)

//activate users
app.get('/activate-user/:token',activateToken)


//login
app.post("/signin",signIn)

app.get("/matches/summary",totalCount)

app.get("/matches",authenticate,matchList)

app.get("/matches/:id",authenticate,getDetail)

app.get("/season",seasonlist)

app.get("/team",teamList)


app.listen(port,()=>{console.log("App Started",port)});
