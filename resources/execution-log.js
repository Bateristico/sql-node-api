class ExecutionLog {
    constructor(Id, Date, Time, Description, BotName){
        this.Id = Id;
        this.Date = Date;
        this.Time = Time;
        this.Description = Description;
        this.BotName = BotName;
    }
}

module.exports = ExecutionLog;