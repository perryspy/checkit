var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	message: String,
	checked: Boolean,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Note', NoteSchema);
