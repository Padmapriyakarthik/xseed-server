const baseurl= "https://xseed-client.herokuapp.com"/*||"http://localhost:3000"*/ ;

require('dotenv').config();

const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const objectId=mongodb.ObjectID;

const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.VALIDATION_KEY;

const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    auth:{
        type: "OAuth2",
        user:'padmapriyakarthik97@gmail.com',
        pass:process.env.PASSWORD
    }
});

const dbUrl=process.env.DB_URL || "mongodb://127.0.0.1:27017";

module.exports={mongoClient,objectId,dbUrl,JWT,JWT_SECRET,transporter,baseurl}