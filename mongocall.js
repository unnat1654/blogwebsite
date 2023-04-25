const mongodb = require("mongodb");
const url= "mongodb+srv://devolopkingbro:XRO1k8cSHFJPj8bM@cluster0.gresqe3.mongodb.net/test";
const client = new mongodb.MongoClient(url);

const mongocall = async (collection)=> {
    const result = await client.connect();
    const db = result.db("blogweb");
    return db.collection(collection);
}
module.exports.mongocall = mongocall;