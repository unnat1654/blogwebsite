const mongodb = require("mongodb");
const url= "mongodb+srv://devolopkingbro:XRO1k8cSHFJPj8bM@cluster0.gresqe3.mongodb.net/test";
const client = new mongodb.MongoClient(url);

const mongocall = async (req,res)=> {
    const result = await client.connect();
    const db = result.db("blogweb");
    return db.collection("titlencontent");
}
module.exports.mongocall = mongocall;