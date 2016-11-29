const jwt = require('jsonwebtoken')
const secret = require('../config').secret

exports.jwtLogin = function(req, res, next) {
	const token = req.get('authorisation')
	
	// will pass so long as the token is valid, does not check particular user, should probably add expiration to tokens
	jwt.verify(token, secret, function(err, payload) {
		if (err) {
			res.status(401).send('Unauthorised')
			console.log(err)
			return
		}
		
		// able to modify the request before handing over to next middleware, cool.
		req.user = payload.sub
		return next()
	})
}