const crypto = require('crypto')

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length) /** return required number of characters */
}


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 THIS IS WHERE WE CHOOSE AN APPROPRIATE ALGORITHM TO ENSURE SECURITY
 */
function sha512(password, salt){
  /** Hashing algorithm sha512 */  
	// creates HMAC with salt
	const hash = crypto.createHmac('sha512', salt)
	// adds password to HMAC (we want to use both)
					.update(password)
	// actually make the hash
					.digest('hex')
	return {
			salt: salt,
			passwordHash: hash
	}
}


function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    return sha512(userpassword, salt);
}

const salt = genRandomString(16)
const password = 'cows go moo'

const obj = sha512(password, salt)
const hpass = obj.passwordHash
const hsalt = obj.salt
console.log(salt === hsalt)

console.log(hpass === sha512(password, hsalt).passwordHash)


exports.genRandomString = genRandomString
exports.sha512 = sha512
exports.saltHashPassword = saltHashPassword


