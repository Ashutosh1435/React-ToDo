import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, },
}, {
    timestamps: true
})
const User = mongoose.model("user", userSchema);
export default User;