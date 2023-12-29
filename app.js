var express=require('express');
var todoController=require('./controller/todoController');


var app=express();

// set up template engine

app.set('view engine', 'ejs');

// inbuilt express middleware to serve static files
app.use(express.static('./public'));

todoController(app);


app.listen(5500);
console.log('you are listening to port 5500');
