const express=require('express');
const app=express();
app.use(express.json());

const cors=require('cors');
app.use(cors());


require('dotenv').config();

const { signUp, activateToken, signIn,currentUser,addFavouriteTeam,removeFavouriteTeam } = require('./AccountManager');
const { totalCount, matchList, getDetail , seasonlist,teamList} = require('./MatchManager');

const {authenticate}=require('./Authenticate');

const port=process.env.PORT || 4000;

//signup
app.post("/signup",signUp)

//activate users
app.get('/activate-user/:token',activateToken)

//login
app.post("/signin",signIn)

//number of documents
app.get("/matches/summary",totalCount)

//matclist retrival
app.get("/matches",authenticate,matchList)

// detail of particular match
app.get("/matches/:id",authenticate,getDetail)

// season filter
app.get("/season",seasonlist)

// team filter
app.get("/team",teamList)

//get current user
app.get("/users",authenticate,currentUser)

// add or update favourite team
app.put('/users/favourite',authenticate,addFavouriteTeam)

// remove favourite team
app.put('/users/remove',authenticate,removeFavouriteTeam)

app.listen(port,()=>{console.log("App Started",port)});
