const config = require('./dbconfig');
const sql = require('mssql');


/* ExecutionLog */
//get all the data from execution log
const getLogs = async() => {
    try{
        let pool = await sql.connect(config);
        let logs = await pool.request().query("SELECT * FROM _tb_ggs_bot_log");
        return logs.recordsets;
    } catch (error) {
        console.log(error);
    }
};

//get an specific data from execution log using the id
const getLog = async(id) => {
    try{
        let pool = await sql.connect(config);
        let logs = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query("SELECT * FROM _tb_ggs_bot_log WHERE Id = @input_parameter or @input_parameter IS NULL");
        return logs.recordsets;
    } catch (error) {
        console.log(error);
    }
};


//makes an insert passing an object 
const addLog = async(executionLog) => {
    //console.log(`date ${executionLog.Date} time ${executionLog.Time} description ${executionLog.Description} botname ${executionLog.BotName}`)
    try {
        let pool = await sql.connect(config);
        let insertExecutionLog = await pool.request()  
        .input('Date', sql.DateTime, executionLog.Date)
        .input('Time', sql.DateTime, executionLog.Time)
        .input('Description', sql.NChar, executionLog.Description)
        .input('BotName', sql.NChar, executionLog.BotName)
        .query("INSERT INTO _tb_ggs_bot_log (Date, Time, Description, BotName) VALUES (@Date, @Time, @Description, @BotName)");

        return "New log added...";
    } catch (error) {
        console.log(error);
    }
};


/* BotAnswers */
//get all the data from execution log
const getAnswers = async() => {
    try{
        let pool = await sql.connect(config);
        let answers = await pool.request().query("SELECT * FROM _tb_ggs_bot_answers");
        return answers.recordsets;
    } catch (error) {
        console.log(error);
    }
};

//makes an insert passing an object 
const addAnswer = async(answer) => {

    try {
        let pool = await sql.connect(config);
        let insertAnswer = await pool.request()
        .input('Question', sql.NChar, answer.Question)  
        .input('Answer', sql.NChar, answer.Answer)
        .input('Date', sql.DateTime, answer.Date)
        .input('Time', sql.DateTime, answer.Time)
        .input('EmployeeName', sql.NChar, answer.EmployeeName)
        .input('EmployeeEmail', sql.NChar, answer.EmployeeEmail)
        .input('SlackId', sql.NChar, answer.SlackId)
        .query("INSERT INTO _tb_ggs_bot_answers (Question, Answer, Date, Time, EmployeeName, EmployeeEmail, SlackId) \
        VALUES (@Question, @Answer, @Date, @Time, @EmployeeName, @EmployeeEmail, @SlackId)");

        return `Answer for user ${answer.EmployeeName} added.`;

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getLogs : getLogs,
    getLog : getLog,
    addLog : addLog,
    getAnswers : getAnswers,
    addAnswer: addAnswer
}