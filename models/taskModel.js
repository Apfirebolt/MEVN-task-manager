const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: false,
        },
        priority: {
            type: String,
            required: false,
        },
        dueDate: {
            type: Date,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
