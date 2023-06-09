//4.video yapıldı postman denendi ve başarılı
//5.video yapıldı postman denendi ve başarılı
//6.video yapıldı postman denendi ve başarılı
//7.video yapıldı postman denendi ve başarılı ve kurst bitti
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const autJwt=require("./helpers/jwt");
const errorHandler=require("./helpers/error-handler");

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(autJwt());
app.use('/public/uploads',express.static(__dirname+'/public/uploads'))
app.use(errorHandler);


//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


const api = process.env.API_URL;
const port=process.env.API_PORT || 3001;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerceRestApi'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(port, ()=>{

    console.log('server is running http://localhost:'+port);
})