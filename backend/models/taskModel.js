import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const taskSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId,
            ref: 'user',
    },
    taskName: 
        {
                type: { String }
        }   
},{
    timestamps: true
});
const Task = mongoose.model("task", taskSchema);
export default Task;