module.exports = function(app) {
	var NoteController = require('../controllers/notes.server.controller');

	var jwt = require('express-jwt');
	var tokenSecret = 'Secret';

	// locks down the application
	var auth = jwt({
		secret: tokenSecret,
		userProperty: 'payload'
	});


	app.route('/api/notes')
		.get(NoteController.list)
		.post(NoteController.create)
		.delete(NoteController.purge)
	;

	app.route('/api/notes/:noteId')
		.get(NoteController.read)
		.put(NoteController.update)
		.delete(NoteController.destroy)
	;

	app.param('noteId', NoteController.noteById);


	var passport = require('passport');
	var User = require('../models/user');

	app.route('/api/register')
		.post(function(req, res, next) {
			if (!req.body.username || !req.body.password) {
				return res.status(400).json({
					message: 'Please fill out all fileds'
				});
			}

			var user = new User();
			user.username = req.body.username;
			user.setPassword(req.body.password);

			user.save(function(err) {
				if (err) {
					return next(err);
				}

				return res.json({
					token: user.generateJWT()
				});
			});
		});
	;

	app.route('/api/login')
		.post(function(req, res, next) {
			if (!req.body.username || !req.body.password) {
				return res.status(400).json({
					message: 'Please fill out all fileds'
				});
			}

			passport.authenticate('local', function(err, user, info) {
				if (err) {
					return next(err);
				}

				if (user) {
					return res.json({
						token: user.generateJWT()
					})
				} else {
					return res.status(401).json(info);
				}
			})(req, res, next);
		});
	;

	// if none of the other routes are matched, default route
	app.get('*', function(req, res) {
		res.sendFile('client/index.html');
	});
};
