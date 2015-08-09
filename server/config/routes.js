module.exports = function(app) {
	var NoteController = require('../controllers/notes.server.controller');

	app.route('/api/notes')
		.get(NoteController.list)
		.post(NoteController.create)
		.delete(NoteController.purge);

	app.route('/api/notes/:noteId')
		.get(NoteController.read)
		.put(NoteController.update)
		.delete(NoteController.destroy);

	app.param('noteId', NoteController.noteById);

	// if none of the other routes are matched, default route
	app.get('*', function(req, res) {
		res.sendFile('client/index.html');
	});
};
