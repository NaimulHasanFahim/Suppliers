import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id : {type: String, required: true},
    supplier_id : {type: Number, required: true, unique: false},
    price : {type: Number, default : 0},
    image :{type: String, required: false},
    amount : {type: Number, default : 0}

});


const Products = mongoose.model('products', productSchema);
export default Products;