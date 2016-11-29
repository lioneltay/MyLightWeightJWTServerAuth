const authentication = require('./controllers/authentication')
const jwtLogin = require('./middleware/jwt').jwtLogin


module.exports = function(app) {
	app.get('/', jwtLogin, function(req, res) {
		res.send({ message: 'Super secret code is ABC123' })
	})
	
	
	
	app.post('/signup', authentication.signup)
	
	
	app.post('/signin', authentication.signin)
	
	
	
	
}