const express = require('express');
const app = express();
const port = 3500;
require('./config/mangoose');
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/',require('./routes'));
app.set('view engine', 'ejs');
app.set('views','./views')
app.use(express.static(__dirname + '/assests'));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });