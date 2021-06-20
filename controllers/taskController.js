const Task = require('../models/taskModel.js');

module.exports.createTask = (async (req, res) => {
    try {
        const { name, description, status, priority, dueDate } = req.body

        const taskExists = await Task.findOne({ name, createdBy: req.user._id })

        if (taskExists) {
            res.status(409)
            throw new Error('Task already exists')
        }

        const task = await Task.create({
            createdBy: req.user._id,
            name,
            description,
            status,
            priority,
            dueDate
        })

        if (task) {
            res.status(201).json({
                message: 'Task successfully created',
                data: task
            })
        } else {
            res.status(400)
            throw new Error('Invalid task data')
        }
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message ? err.message : 'Something went wrong'
        })
    }
})

module.exports.listTask = (async (req, res) => {
    try {
        const tasks = await Task.find({createdBy: req.user._id})
        res.status(200).json({
            results: tasks,
            total: tasks.length
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message ? err.message : 'Something went wrong'
        })
    }
})

module.exports.getTask = (async (req, res) => {
    const task = await Task.findOne({createdBy: req.user._id, _id: req.params.id})

    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404)
        throw new Error('Task not found')
    }
});

module.exports.updateTask = (async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({_id: req.params.id, createdBy: req.user._id}, req.body, {
            returnOriginal: false
        });
        if (updatedTask) {
            res.status(200).json({
                message: 'Task successfully updated',
                data: updatedTask
            })
        }
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message ? err.message : 'Something went wrong'
        })
    }
});

module.exports.deleteTask = (async (req, res) => {
   try {
       const taskDeleted = await Task.findOneAndDelete({_id: req.params.id, createdBy: req.user._id});

       if (taskDeleted) {
           res.status(200).json({
               success: true,
               message: 'Task removed'
           })
       } else {
           res.status(404)
           throw new Error('Task not found')
       }
   } catch(err) {
       res.status(400).json({
           success: false,
           message: err.message ? err.message : 'Something went wrong'
       })
   }
});
