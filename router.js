const authentication = require('./controllers/authentication')
const jwtLogin = require('./middleware/jwt').jwtLogin


module.exports = function(app) {
	app.get('/', jwtLogin, function(req, res) {
		res.send(`Hello User: ${req.user}`)
	})
	
	
	
	app.post('/signup', authentication.signup)
	
	
	app.post('/signin', authentication.signin)
	
	
	
	
}