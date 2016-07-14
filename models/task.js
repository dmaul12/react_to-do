'use strict'
const pg= require('pg-promise')({
  //initialization OPTIONS
});

const config = {
host:       process.env.DB_HOST,
port:       process.env.DB_PORT,
database:   process.env.DB_NAME,
user:       process.env.DB_USER,
password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {

  /* GET /tasks */
  getTasks(req, res, next){
    _db.any("SELECT * from tasks;")
    .then( tasks=> {
      res.rows = tasks;
      next()
    })
    .catch( error=> {
      console.error('Error', error);
    })
  },
  /* POST /tasks */

  addTask(req, res, next){
    console.log('===addTask===', req.body)
    _db.any(
      `INSERT INTO
        tasks (task_name, task_desc)
        VALUES ($1, $2)
        returning *;` , [req.body.name, req.body.desc]

/* alternate syntax
VALUES ($/name/, $/desc/)
returning *;`, req.body
*/

      )
    .then( task=> {
      console.log('ADDED TASK SUCCESFUL');
      res.rows = task;
      next()
    })
    .catch(error=> {
      console.error('ERROR in Adding Task!', error);
    })
  },
  /* PUT /tasks/:taskID */
updateTask(req, res, next){

// tID is invented here
  req.body.tID = Number.parseInt(req.params.taskID);
  req.body.completed = !!req.body.completed;
//deleted the time stamp so user can update
  _db.one(
    `UPDATE tasks SET
    task_name = $/name/,
    task_desc = $/desc/,
    completed = $/completed/
    WHERE task_id = $/tID/
    returning *; `,
    req.body)

  .then( task=> {
    console.log('ADDED UPDATED SUCEESSFUL');
    res.rows = task;
    next();
  })
   .catch(error=> {
      console.error('ERROR in UPDATING Task!', error);
    })
},

  /* DELETE /tasks/:taskID */
deleteTask(req, res, next){
   const tID = Number.parseInt(req.params.taskID);

  _db.none(`
    DELETE FROM tasks
    WHERE task_id =($1)
    `, [tID])

  .then( ()=> {
    console.log('DELETE COMPLETED');
    next();
  })
  .catch(error=> {
      console.error('ERROR in Adding Task!', error);
    })
},

}
