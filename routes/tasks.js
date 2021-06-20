const express = require('express');

const {
    createTask,
    deleteTask,
    updateTask,
    getTask,
    listTask,
} = require('../controllers/taskController.js');
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createTask).get(protect, listTask)

router
    .route('/:id')
    .get(protect, getTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask)

export default router

