require("dotenv").config();

const jwt = require("jsonwebtoken");

const username = (jwttoken) => {
    return jwt.verify(jwttoken, process.env.key,  (err, token) => {
        if(err){
            return ;
        }
        else{
            return token.username;
        }
        
    });
    
}
module.exports = username;