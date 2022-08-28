import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    desc: { type: String, required: true },
    img: { type: String, required: false },
    price : {type: Number, default : 0},
    quantity : {type: Number, default : 0},
    categories: { type: Array, default : [] },
    size: { type: Array, default : [] },
    color: { type: Array, default : [] },
    inStock: { type: Boolean, default: true },
    supplierId : { type: mongoose.Types.ObjectId, ref: 'User' }
});


const Product = mongoose.model('Products', productSchema);
export default Product;