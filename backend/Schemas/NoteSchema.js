const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const noteDefinition = {
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    author: [{
        type: ObjectId,
        ref: 'AuthModel',
        required: true
    }]
};

const noteOptions = {
    timestamps:true
};

const NoteSchema = new mongoose.Schema(noteDefinition, noteOptions);
const NoteModel = mongoose.model("Note", NoteSchema, "notes");
module.exports = NoteModel;
