var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
    note_body: String
});

var Note = mongoose.model("Note", NotesSchema);

module.exports = Note;