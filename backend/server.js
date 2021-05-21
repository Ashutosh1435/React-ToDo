import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRoute.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Wingman",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
)
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.listen(4000, () => {
    console.log(`Serve at http://localhost:4000`);
});