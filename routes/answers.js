const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('../dboperations');


//(GET) all the answers
router.route('/Answers').get((req, res) =>{
    dboperations.getAnswers().then(result => {
        res.json(result[0]);
    })
});

//(POST) one answer
router.route('/Answers').post((req, res) =>{
    let answer = {...req.body};

    dboperations.addAnswer(answer).then(result => {
        res.status(201).json(result);
    })
});

module.exports = router;