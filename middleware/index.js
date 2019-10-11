const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');
module.exports = (app) => {
    app.use((req , res , next) =>   {
        if(req.headers && req.headers.authorization) {
            jwt.verify(req.headers.authorization, secret, function(err, decoded) {
            if (err) {
                req.user = {isAuthenticated: false}
                if(err.name === 'TokenExpiredError')
                    return res.status(401).send({success:false,msg:"Access Token Expired"});
                else
                    return res.status(401).send({success:false,msg:"JWT Error"});
            } 
            else {
                req.user = decoded.sub
                req.user.isAuthenticated = true
                next()
            } 
        })
        } else {
            req.user = {isAuthenticated: false}
            next();
        } 
    });
}

