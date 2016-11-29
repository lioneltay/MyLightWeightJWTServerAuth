const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret


const saltHashPassword = require('../utils/encryption').saltHashPassword

const Schema = mongoose.Schema


const userSchema = new Schema({
	email: {type: String, unique: true, lowercase: true },
	password: String,
	salt: String
})



// middlewareish stuff for save hence 'next'
// encrypt password before save
userSchema.pre('save', function(next) {
	// just how the function works, this is set to user
	const user = this
	
	const hash = saltHashPassword(user.password)
	user.password = hash.passwordHash
	user.salt = hash.salt
	
	
	console.log(user)
	next()
	
})






const userModel = mongoose.model('user', userSchema)

module.exports = userModel