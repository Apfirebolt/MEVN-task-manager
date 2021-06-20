import Task from '../models/taskModel.js'

module.exports.createTask = (async (req, res) => {
    const { name, description } = req.body

    const categoryExists = await Category.findOne({ name })

    if (categoryExists) {
        res.status(409)
        throw new Error('Category already exists')
    }

    const category = await Category.create({
        name,
        description,
    })

    if (category) {
        res.status(201).json({
            _id: category._id,
            name: category.name,
            description: category.description,
        })
    } else {
        res.status(400)
        throw new Error('Invalid category data')
    }
})

module.exports.listTask = (async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        await category.remove()
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

module.exports.getTask = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        await category.remove()
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

module.exports.updateTask = (async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = req.body.category || category.name
        category.description = req.body.description || category.description

        const updatedCategory = await category.save()

        res.json({
            _id: updatedCategory._id,
            name: updatedCategory.name,
            description: updatedCategory.description,
        })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

module.exports.deleteTask = (async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        await task.remove()
        res.json({ message: 'Task removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})
