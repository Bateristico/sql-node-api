const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('../dboperations');


//(GET) all the answers
router.route('/Projects').get((req, res) =>{
    dboperations.getProjects().then(result => {
        res.json(result[0]);
    })
});

//(POST) one answer
router.route('/Projects').post((req, res) =>{
    let projectStatus = {...req.body};

    dboperations.addProjectStatus(projectStatus).then(result => {
        res.status(201).json(result);
    })
});

module.exports = router;