//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title: String ,
  body: String 

};

const Post = mongoose.model("Post",postSchema);


app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{ posts : posts});
  });
 
});

app.get("/contact",function(req,res){
   res.render("contact");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/compose", function(req,res){
  res.render("compose")
});

app.get("/posts/:postId",function(req,res){
   
   const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId}, function(err, post){

    res.render("post", { title: post.title, body: post.body });

   });
   
});

app.post("/compose", function(req,res){
   const post = new Post({
     title : req.body.titleText,
     body : req.body.bodyText
   })
   post.save(function(err){
     if(err)
     console.log(err);
     else
     res.redirect("/");
   });
  
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
