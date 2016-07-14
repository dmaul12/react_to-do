'use strict'
const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = (DEV) ? require('dotenv').config() : undefined;

const express       = require('express');
const logger        = require('morgan');
const path          = require('path');
const bodyParser    = require('body-parser');

const taskRoutes    = require('./routes/tasks')

const app = express();
const PORT = process.env.PORT || process.argv[2] || 3009;

// set up logging
app.use(logger('dev'));
app.use( bodyParser.json());

// lets go
app.listen(PORT, ()=>
  console.log('listening on port ', PORT));

//routes
app.use('/tasks', taskRoutes)

app.get('/', (req,res)=>res.send('hompage'));


