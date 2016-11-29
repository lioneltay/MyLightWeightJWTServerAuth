const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

const sha512 = require('../utils/encryption').sha512

exports.signup = function(req, res, next) {
	const email = req.body.email
	const password = req.body.password
		
	const user = new User({
		email: email,
		password: password
	})
	
	user.save(function(err) {
		if (err) return next(err)
		
		res.send({ token: jwt.sign({ sub: user.id }, secret) })
	})
		
}


exports.signin = function(req, res, next) {
	const email = req.body.email
	const password = req.body.password
	
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.send('Something seems to be wrong on our end')
			console.log(err)
			return
		}
		
		if (!user) {
			return res.send('Unauthorised')
		}
		
		const candidateHash = sha512(password, user.salt).passwordHash
		if (candidateHash !== user.password) { 
			return res.send('Unauthorised')
		}
		
		console.log('user', user)
		res.send({ token: jwt.sign({ sub: user.id }, secret) })
	})
	
}




