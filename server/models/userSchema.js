import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String, required: true},
    accountNumber : {type: Number, required: true, unique: true},
    address : {type: String, required: true},
    balance : {type: Number, default : 0},
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


const User = mongoose.model('User', userSchema);
export default User;