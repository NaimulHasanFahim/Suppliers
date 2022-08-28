import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    productId : {type: mongoose.Types.ObjectId, ref: 'Products', required: true},
    supplierId : {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    transactionId : {type: String, required: true, unique: true},
    address : {type: String, required: true},
    price : {type: Number, default : 0},
    quantity : {type: Number, default : 0},
    status: {type: String, default : "Pending", required : true},
    ecom_orderId : {type: String, required: true, unique: true}
});


const Order = mongoose.model('Order', orderSchema);
export default Order;