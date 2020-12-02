//dependencies required for the api
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//const router = express.Router(); <-- commented to reorganize the architecture
//New Routes = New architecture
const logsRoute = require('./routes/logs');
const answersRoute = require('./routes/answers');

//setting the app
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

//server-uri/api
app.use('/api',logsRoute);
app.use('/api', answersRoute);

//setting the app
const port = process.env.PORT || 3000;
app.listen(port)
console.log(`Bot API is running at port ${port}` );

