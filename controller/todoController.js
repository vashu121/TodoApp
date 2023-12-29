var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
//Here you should update your login credentials to database
//You may replace your login credentials following the pattern: 'mongodb://YOUR_USER:YOUR_PASSWORD@ds223063.mlab.com:23063/tutorial'
const url="mongodb+srv://vashumaurya121:Vashu123@todo.vwnuxbd.mongodb.net/";

// const connectionParams={
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// };
const TodoData=[];
mongoose.connect(url)
.then(()=>{
    console.log("connected to the database");
})
.catch(err=>{
    console.error(`error connection to the database. n${err}`);
});

//Create a schuma - this is a like a blueprint
var toDoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', toDoSchema);
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function (app) {

    app.get('/todo', async (req, res) => { 
        //get data from mongodb and pass it to the view
    try {
        const data=await Todo.find({})
        if(!data) res.status(400);
        // TodoData=[...data]
        res.render('todo', {todos: data});
    }
     catch (error) {
        console.log(error);
    }
        //in case you want to use as rest API, uncomment the line bellow, an comment the line above
        //res.json(data);
    });

    app.post('/todo', urlencodedParser, async(req, res) =>{
        //console.log(req.body);
        //get data from the view and add it to the mongodb
        // console.log(req.body);
        try {
            // const data=await Todo.find({});
            // console.log(data);
            // data.push(req.body.item);
            // if(!data) res.status(400);
            // res.render('todo', {todos: data});
            const data= new Todo(req.body);
            await data.save();
            // console.log(data);
            const newData=await Todo.find({});
            res.render('todo', {todos: newData});
        } catch (error) {
            console.log(error);
        }
        
    });

    app.delete('/todo/:item', async (req, res)=> {
        //delete the requested item from mongodb
        try {
            const data= await Todo.findOneAndDelete({item:req.params.item.replace(/\-/g, " ")});
            // console.log(data);
            res.json(data);
            // return true;
        } catch (error) {
            console.log(error);
        }
});

};