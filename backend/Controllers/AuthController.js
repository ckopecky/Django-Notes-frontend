const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Auths = require('../Schemas/AuthSchema');
require('dotenv').config();

const tokenGenerator = authUser => {
    const options = {
        expiresIn: '24h'
    }
    const payload = { name: 'authUser.username'}
    const secret = process.env.SECRET;

    return jwt.sign(payload, secret, options)
};

const login = (req, res) => {
    const { username, password} = req.body;
    Auths.findOne({username})
        .then(authUser => {
            if(!authUser) {
                res.status(404).json({Error: 'user not found'});
            }
            else {
                authUser
                .validatePassword(password)
                .then(match => {
                    if(match){
                    const token = tokenGenerator(authUser);
                    res.status(200).json({Message:`Welcome, ${authUser.firstName}. Have a token.`, token})
                    } else {
                        res.status(400).json({Message: 'Credentials not found in database'});
                    }
                })
                .catch(err => {
                    res.status(500).json({Error: err.message});
                });
            }
        })
}

const register = (req, res) => {
    const { username, password, confirmedPassword, firstName, lastName } = req.body;
    if(password !== confirmedPassword) {
        res.status(400).json({Message: "Passwords do not match."});
    } else if(!username, !password, !firstName, !lastName) {
        res.status(400).json({Message: "Must include username, password, firstName and lastName"});
    }
    Auths.create({username, password, firstName, lastName})
        .then(auth => {
            res.status(201).json(auth);
        })
        .catch(err => {
            res.status(500).json({Error: err.message})
        });
}
router.route('/login')
    .post(login);
router.route('/register')
    .post(register);

module.exports=router;



