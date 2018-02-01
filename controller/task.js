const Task = require('../model/Task')

exports.getTasks = async (ctx) => {
    const tasks = await Task.find({})
    if (!tasks) {
        throw new Error("There was an error retrieving your tasks.")
    } else {
        ctx.body = tasks
    }
}

exports.createTask = async (ctx) => {
    const {name, urgency} = ctx.request.body
    const result = await Task.create({
        name: name,
        urgency: urgency
    })
    if (!result) {
        throw new Error('Task failed to create.')
    } else {
        ctx.body = {message: 'Task created!', data: result}
    }
}

exports.updateTask = async (ctx) => {
    const {name, newName, newUrgency} = ctx.request.body
    const searchByName = {name: name}
    const update = {name: newName, urgency: newUrgency}
    const result = await Task.findOneAndUpdate(searchByName, update)
    if (!result) {
        throw new Error('Task failed to update.')
    } else {
        console.log(result)
        ctx.body = {message: 'Task updated!', data: result}
    }
}

exports.deleteTask = async (ctx) => {
    const {name} = ctx.request.body
    const result = await Task.findOneAndRemove({name})
    if (!result) {
        throw new Error('Task failed to delete.')
    } else {
        ctx.status = 200
        ctx.body = {message: 'success!'}
    }
}

exports.createConcurrentTasks = async (ctx) => {
    const {nameTaskOne, urgencyTaskOne, nameTaskTwo, urgencyTaskTwo} = ctx.request.body
    const taskOne = Task.create({
        name: nameTaskOne,
        urgency: urgencyTaskOne
    })
    const taskTwo = Task.create({
        name: nameTaskTwo,
        urgency: urgencyTaskTwo
    })
    const [t1, t2] = await Promise.all([taskOne, taskTwo])
    if (!t1 || !t2) {
        throw new Error('Tasks failed to be created.')
    } else {
        ctx.body = {message: 'Tasks created!', taskOne: t1, taskTwo: t2}
    }
}

exports.deleteConcurrentTasks = async (ctx) => {
    const {nameTaskOne, nameTaskTwo} = ctx.request.body
    const taskOne = Task.findOneAndRemove({name: nameTaskOne})
    const taskTwo = Task.findOneAndRemove({name: nameTaskTwo})
    const [t1, t2] = await Promise.all([taskOne, taskTwo])
    if (!t1 || !t2) {
        throw new Error('Tasks failed to delete.')
    } else {
        ctx.body = {message: 'Tasks deleted successfully!'}
    }
}








