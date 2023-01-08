import express from "express";
import cors from "cors";
import Connection from "./Connection/db.js";
import userRouter from "./routes/User.Route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
const PORT=8080
app.listen(process.env.PORT || PORT, async () => {
  await Connection;
  console.log(`server started at http://localhost:${PORT}`);
});

// import express from "express"
// import mongoose from "mongoose"
// import fetch from "node-fetch"
// async function getPosts(){
//   const myPosts=await fetch("https://jsonplaceholder.typicode.com/posts")
// const result= await myPosts.json()
// console.log(result)
// }
// getPosts()