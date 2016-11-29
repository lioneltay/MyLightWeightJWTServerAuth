const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

const sha512 = require('../utils/encryption').sha512


// May refactor to use promises later. Learn mongoose and mongodb!
exports.signup = function(req, res, next) {
	const email = req.body.email
	const password = req.body.password
	
	User.findOne({ email: email }, function(err, existingUser) {
		
		if( !email || !password) {
			return res.status(422).send({ error: 'You must provide email and password' })
		}
		
		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' })
		}
		
		const user = new User({
			email: email,
			password: password
		})

		user.save(function(err) {
			if (err) {
				return res.status(401).send('Email already in use')
			}

			res.send({ token: jwt.sign({ sub: user.id }, secret) })
		})
	})
	
		
}


exports.signin = function(req, res, next) {
	const email = req.body.email
	const password = req.body.password
	
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			res.status(400).send('Something seems to be wrong on our end')
			console.log(err)
			return
		}
		
		if (!user) {
			return res.status(401).send('Unauthorised')
		}
		
		const candidateHash = sha512(password, user.salt).passwordHash
		if (candidateHash !== user.password) { 
			return res.status(401).send('Unauthorised')
		}
		
		console.log('user', user)
		res.send({ token: jwt.sign({ sub: user.id }, secret) })
	})
	
}




