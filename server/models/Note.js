var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	message: String,
	checked: Boolean
});

module.exports = mongoose.model('Note', NoteSchema);
