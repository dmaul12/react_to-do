'use strict'
const express = require('express');
const tasks   = express.Router();

// const taskData= [];

/* get the database middleware */
const db      = require('../models/task');

/* convenience method for sending */
const sendJSONresp = (req,res)=>res.json(res.rows)

tasks.route('/:taskID')
  .put(db.updateTask, sendJSONresp)
  .delete(db.deleteTask, (req,res)=>res.send(req.params.taskID))
    // .get((req,res)=>res.send(`show one task ${req.params.taskID}`))
  // .put((req,res)=>res.send(`edit one task ${req.params.taskID}`))
  // .delete((req,res)=>res.send(`deleted one task ${req.params.taskID}`))

tasks.route('/')
  .get(db.getTasks, sendJSONresp)
  .post(db.addTask, sendJSONresp)
  // .get((req,res)=>res.send('show tasks'))
  // .post((req,res)=>res.send('posted new task'))



module.exports = tasks;

// // long way of doing the above
// //long way of get post
// app.get('/tasks', (req,res)=>res.send('task list'));
// app.post('/tasks', (req,res)=>res.send('posting task list'));
// //long way of tasksID
// app.get('/tasks/:id', (req,res)=>res.send('here is one task'));
// app.put('/tasks/:id', (req,res)=>res.send('post task'));
// app.delete('/tasks/:id', (req,res)=>res.send('delete task'));
// app.get('/tasks/:id/edit', (req,res)=>res.send('view edit form'));
