import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import data from '../data.js';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get('/seed',
    expressAsyncHandler(async (req, res) => {
        //  for removing complete collection data
        // await User.remove({});
        const createdUsers = await User.insertMany(data.users)
        res.send({ createdUsers })
    }))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        token: generateToken(createdUser),
    });
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: generateToken(user),
            })
            return;
        }
        else {
            res.status(401).send({ message: "Invalid User password" })
        }
    }
    else {
        res.status(401).send({ message: "Invalid User email" })
    }
}))

userRouter.get('/details', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
        res.send(user);
    }
}))
export default userRouter;