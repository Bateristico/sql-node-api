const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('../dboperations');


//**  SETTING UP THE MIDDLEWARE **/
router.use((req, res, next ) => {
    console.log('middleware');
    next(); // next when you have no return
});

//(GET) all the logs
router.route('/Logs').get((req, res) =>{
    dboperations.getLogs().then(result => {
        res.json(result[0]);
    })
});

//(GET) one log by the id
router.route('/Logs/:id').get((req, res) =>{
    dboperations.getLog(req.params.id).then(result => {
        res.json(result[0]);
    })
});


//(POST) one log
router.route('/Logs').post((req, res) =>{
    let log = {...req.body};

    dboperations.addLog(log).then(result => {
        res.status(201).json(result);
    })
});

module.exports = router;