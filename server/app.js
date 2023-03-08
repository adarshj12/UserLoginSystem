const express =require('express');
const morgan =require('morgan');
require('dotenv').config();
const port=process.env.PORT
const connection=require('./config/db')
const userRoute = require('./routes/users')
const cors= require('cors')
//rest object
const app = express();
app.use(cors())
//database connection
connection()

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/images',express.static('images'))
//routes
app.get('/',(req,res)=>{
    res.status(200).send({message:`server running on http://localhost:${port}`})
})

app.use('/',userRoute)

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})

