const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const path=require('path');
const connectDatabase =require('./config/database')

dotenv.config({path:(path.join(__dirname,'config','config.env'))});

//middlewares
app.use(express.json());
app.use(cors());
app.use('/images',express.static('uploads'));
connectDatabase();

const foods =require('./routes/foods');
const user=require('./routes/user');
const cart=require('./routes/cart');
const order=require('./routes/order');

app.use('/api/v1',foods);
app.use('/api/v1',user);
app.use('/api/v1',cart);
app.use('/api/v1',order);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to the port ${process.env.PORT}`)
})