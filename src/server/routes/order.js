const router = require('express').Router();
const Task = require('../models/tasks')
const { handleError } = require('../db')
const logger = require('../utils/logger')

// Fake validation of the order task
router.put('/:task?',  (req, res) => {
  const taskId = req.params.task;
  if(!taskId){
    res.statusCode(400).send('Task id is incorrect')
  } else if(isNaN(taskId)) {
    logger(req, res, 'Task exists only on client')
    // Fake latency
    setTimeout(() => {
      res.sendStatus(200);
    }, 1500)
  } else {
    // Delete
    Task.findOne({id: taskId}, function(err, task){
      if(err) handleError(err, res)
      if(task){
        Task.deleteOne({id: taskId}, function(err){
          if (err) handleError(err, res)
          // Fake latency
          setTimeout(() => {
            res.sendStatus(200);
          }, 1500)
        })
      }else {
        res.statusCode(400).send('No existing task for the given id')
      }
    })
  }
})

module.exports = router