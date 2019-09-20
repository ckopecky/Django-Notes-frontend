const express = require('express');
const server = express();
const NoteController = require('./Controllers/NoteController.js');
const AuthController = require('./Controllers/AuthController.js');
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const port = process.env.PORT;

//database connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(()=>{
        console.log('\nConnected to database on MongoDB\n');
    })
    .catch(err => {
        console.log({Error: err.message, message: "Did you start an instance of Mongo?"})
    });
    const restricted = (req, res, next) => {
        const token = req.headers.authorization;
        const secret = process.env.SECRET;

        if(token){
            jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Token was not decoded', err });
            } 
            next();
        });
    
        } 
        else{
            res.send({message: "Error in retrieving token."})
        }
    }
server.use(express.json());
server.use('/api/notes', restricted, NoteController);
server.use('/auth', AuthController);

server.get('/', (req, res) => {
    res.json(200, "Sanity check...")
})

server.listen(port, ()=> {
    console.log(`\n\n*******Server is listening on port ${port}*******\n`)
})