CREATE TABLE [_tb_ggs_bot_log] (
  [Id]          INT    NOT NULL    IDENTITY ( 1 , 1 ),
  [Date]        DATETIME    NOT NULL,
  [Time]        DATETIME    NOT NULL,
  [Description] NCHAR(200)    NOT NULL,
  [BotName]     NCHAR(20)    NOT NULL,
     PRIMARY KEY ( [Id] ))


CREATE TABLE [_tb_ggs_bot_answers] (
  [Id]            INT    NOT NULL    IDENTITY ( 1 , 1 ),
  [Question]      NCHAR(50) NOT NULL,
  [Answer]        NCHAR(50) NOT NULL,
  [Date]          DATETIME  NOT NULL,
  [Time]          DATETIME  NOT NULL,
  [EmployeeName]  NCHAR(50) NOT NULL,
  [EmployeeEmail] NCHAR(100) NOT NULL,
  [SlackId]       NCHAR(20) NOT NULL,
     PRIMARY KEY ( [Id] ))



