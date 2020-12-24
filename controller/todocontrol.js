
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var new_db="mongodb+srv://sarthak1:sarthak480@todo-poyps.mongodb.net/test?retryWrites=true&w=majority";


var todoSchema = new mongoose.Schema({
    item:String
});

var Todo= mongoose.model('Todo',todoSchema);

var urlencodedparser= bodyparser.urlencoded({extended:false});


mongoose.connect(new_db, { 'useNewUrlParser': true ,'useUnifiedTopology': true},function(){
    console.log("server connected..");
});
module.exports = function(app){
    
    app.get('/todo', function(req,res){
        Todo.find({},function(err,data){
            if(err) throw err;
        res.render('todo', {todos:data});
        });
    });

    app.post('/todo', function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            req.json(data);
        });
    });

    app.delete('/todo/:item', function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};