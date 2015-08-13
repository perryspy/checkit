module.exports = function(app) {
	var NoteController = require('../controllers/notes.server.controller');
	var UserController = require('../controllers/users.server.controller');

	app.route('/api/notes')
		.get(UserController.verifyToken, NoteController.list)
		.post(UserController.verifyToken, NoteController.create)
		.delete(NoteController.purge);

	app.route('/api/notes/:noteId')
		.get(NoteController.read)
		.put(UserController.verifyToken, NoteController.update)
		.delete(NoteController.destroy);

	app.param('noteId', NoteController.noteById);

	app.route('/api/register')
		.post(UserController.register);

	app.route('/api/login')
		.post(UserController.login);

	// if none of the other routes are matched, default route
	app.get('*', function(req, res) {
		res.sendFile('client/index.html');
	});
};
