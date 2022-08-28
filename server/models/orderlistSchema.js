import mongoose from "mongoose";

const orderlistSchema = new mongoose.Schema({
    product_id : {type: String, required: true},
    supplier_id : {type: Number, required: true, unique: false},
    transaction_id : {type: String, required: true},
    address : {type: String, required: true},
    price : {type: Number, default : 0},
    image :{type: String, required: false},
    amount : {type: Number, default : 0},
    status: {type: String, default : "Pending", required : true}

});


const orderlist = mongoose.model('orderlist', orderlistSchema);
export default orderlist;