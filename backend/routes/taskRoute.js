import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import data from '../data.js';
const taskRouter = express.Router();
import { isAuth } from '../utils.js';

taskRouter.get('/seed',
    expressAsyncHandler(async (req, res) => {
        const createdTasks = await Task.insertMany(data.task)
        res.send({ createdTasks });
}))

taskRouter.post('/create',
    expressAsyncHandler(async (req, res) => {
        const createdTask = await Task.create(req.body)
        res.send({ createdTask });
}))

taskRouter.get('/tasks', isAuth,
expressAsyncHandler(async (req, res) => {
    const tasks  = await Task.find({user: req.query.userId},'',{lean:true});
    res.send(tasks);
}))

taskRouter.post('/delete', isAuth,
    expressAsyncHandler(async (req, res) => {
        const deletedTask = await Task.remove({_id: req.query.taskId });
        res.send({ deletedTask });
}))

taskRouter.post('/edit', isAuth,
    expressAsyncHandler(async (req, res) => {
        const updatedTask = await Task.updateOne({_id: req.body.taskId },{$set: {taskName: req.body.name}});
        res.send({ updatedTask });
}))

export default taskRouter;