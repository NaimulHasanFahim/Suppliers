import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    sender : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reciever : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    amount : {type: Number, required: true},
});

const Transaction = mongoose.model('Transactions', transactionSchema);
export default Transaction;