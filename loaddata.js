
const mongodb = require('mongodb');
var {dbUrl}=require('./Require')

let MongoClient = require('mongodb').MongoClient;


const csvFilePath='customers.csv'
const csv=require('csvtojson')

csv()
.fromFile('matchdata.csv')
.then((jsonObj)=>{
    console.log(jsonObj);
	MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, db) => {
	  if (err) throw err;
	  var dbo = db.db("cricket");
	  dbo.collection("matches").insertMany(jsonObj, (err, res) => {
		if (err) throw err;
		console.log("Number of documents inserted: " + res.insertedCount);

		db.close();
	  });
	});
})


