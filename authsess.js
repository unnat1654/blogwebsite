const jwt = require("jsonwebtoken");

const username = (jwttoken) => {
    return jwt.verify(jwttoken, 'secret',  (err, token) => {
        if(err){
            return ;
        }
        else{
            return token.username;
        }
        
    });
    
}
module.exports = username;