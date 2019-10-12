const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');

const app = express() 
mongoose.connect('mongodb://localhost:27017/Payment',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(express.json())



app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./views'));

const publicDirectoryPath = path.join(__dirname,'/public');

app.use(express.static(publicDirectoryPath))

app.use('/paytmPath',router)



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Server is up on port : '+ port)
})