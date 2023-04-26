require("dotenv").config();

const mongodb = require("mongodb");
const url= process.env.mongourl;
const client = new mongodb.MongoClient(url);

const mongocall = async (collection)=> {
    const result = await client.connect();
    const db = result.db(process.env.dbname);
    return db.collection(collection);
}
module.exports.mongocall = mongocall;