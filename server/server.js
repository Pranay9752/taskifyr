const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer  = require('multer')

//import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');


//app
const app = express();
app.use(cors());


app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 

// db
mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

//middlewares
// multer



//routes middleware
app.use('/uploads', express.static('uploads'));
app.use('/api/user', authRoutes);
app.use('/api/product', projectRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});