var Note = require('./../models/Note');
var _ = require('lodash');

exports.list = function(req, res) {
	if (req.token) {
		Note.find({user: req.token._id}, function(err, notes) {
			if (err) { res.send(err); }
			res.json(notes);
		});
	} else {
		return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
	}
};

exports.create = function(req, res) {
	var note = new Note(req.body);
	note.user = req.token._id;

	note.save(function(err, note) {
		if (err) { res.send(err); }
		res.json(note);
	});
};

exports.purge = function(req, res) {
	Note.remove(function(err, note) {
		if (err) { res.send(err); }
		res.json({ message: "good job m8!" });
	});
};

exports.noteById = function(req, res, next, id) {
	Note.findById(id, function(err, note) {
		if (err) { return next(err); }
		if(!note) { return next(new Error('can\'t find note')); }
		req.note = note;
		return next();
	});
};

exports.read = function(req, res) {
	res.json(req.note);
};

exports.update = function(req, res) {
	var note = req.note;
	note = _.extend(note, req.body);
	note.save(function(err, note) {
		if (err) { res.send(err); }
		res.json(note);
	})
};

exports.destroy = function(req, res) {
	req.note.remove(function(err, note) {
		if (err) { res.send(err); }
		res.json({ message: "good job m8!" });
	});
};
