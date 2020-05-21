const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");

//const postRoutes = require("./routes/posts");
//const userRoutes = require("./routes/user");
//const path = require("path");

const mongoose = require("mongoose");

mongoose
.connect(
"mongodb+srv://ashok:aDqcEZ3FX3O9iKQe@cluster0-aogye.mongodb.net/test?retryWrites=true&w=majority"
)
.then(() => {
console.log("Connected to database!");
})
.catch(() => {
console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  
  post.save();
  
  //.then((createdPost) => {
    //res.status(201).json({
      //message: "Post added successfully",
      //postId: createdPost._id,
   console.log(post);
   res.status(201).json({
      message: "Post added succesfully",
   });

});
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

//app.put();

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
