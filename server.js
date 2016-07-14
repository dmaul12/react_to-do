'use strict'

//this tests to see if we have an environment
// only load the dotenv if we need it
const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = DEV && require('dotenv').config();

// regular stuff
const express       = require('express');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
const path          = require('path');

const app           = express();
const PORT          =  process.argv[2] || process.env.PORT ||  3009;

const taskRoutes    = require('./routes/tasks')

// set up logging
app.use(logger('dev'));

// we're only going to accept json
app.use( bodyParser.json());

// bring in the task routes
app.use('/tasks', taskRoutes)

// lets go
app.listen(PORT, ()=>
  console.log('listening on port ', PORT));

app.get('/', (req,res)=>res.send('hompage'));


