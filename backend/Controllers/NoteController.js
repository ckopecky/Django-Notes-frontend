const router = require('express').Router();
const Notes = require('../Schemas/NoteSchema');

const get = (req, res) => {
    Notes.find()
    .populate('author', {_id:0, name: 1})
    .then(notes => {
        if(notes.length===0) {
            res.status(404).json({Message: "Notes not found"});
        }
        else {
            res.status(200).json({notes});
        }
    })
    .catch(err => {
        res.status(500).json({Error: "There was a server error in retrieving notes", res, err});
    });
};

const post = (req, res) => {
    const { title, content, author } = req.body;
    if(!title || !content || !author){
        res.status(401).json({Message: "Note must have title, content, author"})
    } else {
        Notes.create({ title, content, author })
        .then(response => {
            if(!response) {
                res.status(400).json({Message: err.message});
            } else {
                res.status(201).json(response);
            }
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
    }
    
}

const postAuthor = (req, res) =>{
    const { _id } = req.params;
    const { authorId } = req.body;

    Notes.findOne({ _id})
        .then(foundAuthor =>{
            foundAuthor.notes = [...foundAuthor.notes, authorId];
            foundAuthor
                .save()
                .then(savedAuthor =>{
                    res.status(201).json(savedAuthor);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving author to Notes database", res, err)
                })
        .catch(err =>{
            sendUserError(500, "There was an error in saving author to database");
            });
        });
}

router.route('/')
    .get(get)
    .post(post);

router.route('/:id/note')
    .post(postAuthor);

module.exports=router;