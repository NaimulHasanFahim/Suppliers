import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js';




dotenv.config();


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//SIGNIN SIGNUP SIGNOUT
app.use('/api/auth', authRoutes);

// ADD DELETE UPDATE PRODUCT
app.use('/api/product',productRoutes);

// HANDLE ORDERS
app.use('/api/order',orderRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: '+PORT)))
.catch((error) =>console.log(error.message));
// mongoose.set('useFindAndModify', false);
