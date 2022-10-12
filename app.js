const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items = [];
let workItems = [];
app.get("/",function(req,res){
    var today = new Date();
    var day = today.getDay();
    var currentDay = "";
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    currentDay = today.toLocaleDateString("hi-IN",options);
    res.render('list', {listTitle: currentDay,newItem: items});
});

app.post("/",function(req,res){
    let redirect = req.body.button;
    if(redirect==="Work"){
        let item = req.body.nextItem;
        workItems.push(item);
        res.redirect("/work");
    }else{
        let item = req.body.nextItem;
        items.push(item);
        res.redirect("/");//this will call the get request for this route
    }
    
});

app.get("/work",function(req,res){
    res.render('list',{listTitle : "Work Item",newItem : workItems});
});
app.get("/about",function(req,res){
    res.render("about");
})
app.listen(3000,function(){
    console.log("Server is up and running at port number 3000");
});