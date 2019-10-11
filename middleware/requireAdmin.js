module.exports = function(group){
	return function(req, res, next){
		if(req.user && req.user[group]){
			next();
		} else {
			return res.status(401).send({ error: 'Unauthorized' });
		}
	}
}