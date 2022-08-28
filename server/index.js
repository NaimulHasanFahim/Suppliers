import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import addproducts from './routes/addproducts.js';
import authRoutes from './routes/auth.js';
import deleteproduct from './routes/deleteproduct.js';
import products from './routes/products.js';

import orderlist from './routes/orderlist.js';

import addOrder from './routes/addOrder.js';
import updateOrder from './routes/updateOrder.js';



dotenv.config();


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRoutes);

app.use('/addProducts',addproducts);
app.use('/deleteProduct',deleteproduct);
app.use('/products',products);

app.use('/orderlist',orderlist);
app.use('/addOrder',addOrder);
app.use('/updateOrder',updateOrder);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: '+PORT)))
.catch((error) =>console.log(error.message));
// mongoose.set('useFindAndModify', false);
