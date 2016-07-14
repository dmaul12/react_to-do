'use strict'
const express = require('express');
const logger = require('morgan');
const path  = require('path');

const app = express();
const PORT = process.env.PORT || process.argv[2] || 3009;

// set up logging
app.use(logger('dev'));

// lets go
app.listen(PORT, ()=>
  console.log('listening on port ', PORT));

app.route('/tasks/:id')
  .get((req,res)=>res.send(`show one task ${req.params.id}`))
  .put((req,res)=>res.send(`edit one task ${req.params.id}`))
  .delete((req,res)=>res.send(`deleted one task ${req.params.id}`))

app.route('/tasks')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('posted new task'))

app.get('/', (req,res)=>res.send('hompage'));

// // long way of doing the above
// //long way of get post
// app.get('/tasks', (req,res)=>res.send('task list'));
// app.post('/tasks', (req,res)=>res.send('posting task list'));
// //long way of tasksID
// app.get('/tasks/:id', (req,res)=>res.send('here is one task'));
// app.put('/tasks/:id', (req,res)=>res.send('post task'));
// app.delete('/tasks/:id', (req,res)=>res.send('delete task'));
// app.get('/tasks/:id/edit', (req,res)=>res.send('view edit form'));
