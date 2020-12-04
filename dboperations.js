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


/* Project info */
//get all the data from _tb_ggs_project_status
const getProjects = async() => {
    try{
        let pool = await sql.connect(config);
        let projects = await pool.request().query("SELECT * FROM _tb_ggs_project_status");
        return projects.recordsets;
    } catch (error) {
        console.log(error);
    }    
}

//makes an insert passing an object 
const addProjectStatus = async(projectStatus) => {

    try {
        let pool = await sql.connect(config);
        let insertProject = await pool.request()
        .input('ProjectName', sql.NChar, projectStatus.ProjectName)  
        .input('Stage', sql.NChar, projectStatus.Stage)
        .input('Budget', sql.NChar, projectStatus.Budget)
        .input('TimeLine', sql.NChar, projectStatus.TimeLine)
        .input('Percentage', sql.NChar, projectStatus.Percentage)
        .input('Risks', sql.NChar, projectStatus.Risks)
        .input('ImportantBusiness', sql.NChar, projectStatus.ImportantBusiness)
        .input('OverallStatus', sql.NChar, projectStatus.OverallStatus)
        .input('Date', sql.DateTime, projectStatus.Date)
        .input('Time', sql.DateTime, projectStatus.Time)
        .input('EmployeeName', sql.NChar, projectStatus.EmployeeName)
        .input('EmployeeEmail', sql.NChar, projectStatus.EmployeeEmail)
        .input('SlackId', sql.NChar, projectStatus.SlackId)


        .query("INSERT INTO _tb_ggs_project_status (ProjectName, Stage, Budget, TimeLine, Percentage, Risks, ImportantBusiness, OverallStatus, \
            Date, Time, EmployeeName, EmployeeEmail, SlackId)\
        VALUES (@ProjectName, @Stage, @Budget, @TimeLine, @Percentage, @Risks, @ImportantBusiness, @OverallStatus, \
            @Date, @Time, @EmployeeName, @EmployeeEmail, @SlackId)");

        return `Status for project ${projectStatus.ProjectName} has been updated by ${projectStatus.EmployeeName}`;

    } catch (error) {
        console.log(error);
    }
    

    
};

//* Teams *//
//gets all the teams (ggs project)
const getTeams = async() => {
    try{
        let pool = await sql.connect(config);
        let teams = await pool.request().query("SELECT * FROM _tb_holiday_tool_teams");
        return teams.recordsets;
    } catch (error) {
        console.log(error);
    }
};

//gets all the team managers (ggs project managers)
const getTeamManagers = async() => {
    try{
        let pool = await sql.connect(config);
        let teamManagers = await pool.request().query(`SELECT DISTINCT manager.imie_nazwisko as "Team Manager Name", SUBSTRING(Manager.FQN,10,LEN(Manager.FQN)) as "Team Manager Email", RTRIM(Manager.SlackId) as "Slack Id"
        FROM _tb_holiday_tool_users AS Employee
            LEFT JOIN _tb_holiday_tool_user_team AS UserTeam
                ON Employee.id_user = UserTeam.id_user
                LEFT JOIN _tb_holiday_tool_teams as TeamManager
                    ON TeamManager.id_team = UserTeam.id_team
                    LEfT JOIN _tb_holiday_tool_users AS Manager
                        ON TeamManager.id_team_manager = Manager.id_user
        WHERE Manager.FQN IS NOT NULL`);
        return teamManagers.recordsets;
    } catch (error) {
        console.log(error);
    }
};





module.exports = {
    getLogs : getLogs,
    getLog : getLog,
    addLog : addLog,
    getAnswers : getAnswers,
    addAnswer: addAnswer,
    getProjects: getProjects,
    addProjectStatus: addProjectStatus,
    getTeams: getTeams,
    getTeamManagers : getTeamManagers,
}