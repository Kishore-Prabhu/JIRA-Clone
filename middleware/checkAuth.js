module.exports =  function(req, res, next){
        if(req.user.isAuthenticated)
            return next()
        else
            return res.status(401).json({success:false,message:"Unauthorized token"})
}
