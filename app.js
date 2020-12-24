var express = require('express');

var todocontroller= require('./controller/todocontrol');

var app= express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todocontroller(app);


app.listen(3000);

console.log('you are listening to port 3000');
