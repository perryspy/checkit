module.exports = function(app) {
	var NoteController = require('./notes.server.controller');

	app.route('/api/notes')
		.get(NoteController.list)
		.post(NoteController.create)
		.delete(NoteController.purge)
	;

	app.route('/api/notes/:noteId')
		.get(NoteController.read)
		.put(NoteController.update)
		.delete(NoteController.delete)
	;

	app.param('noteId', NoteController.noteById);

	app.get('*', function(req, res) {
		res.sendFile('client/index.html');
	});
};
