import UserModel from "../models/User.Model.js";
import { Router } from "express";



import fetch from "node-fetch";

const userRouter = Router();

userRouter.post("/", (req, res) => {
  let gets = getPost();
  res.send(gets);
});

async function getPost() {
  const myPosts = await fetch("https://randomuser.me/api?results=100");
  const response = await myPosts.json();
  console.log("Blogs",response);
  let result = response;

  for (let i = 0; i < result.length; i++) {
    const user = new UserModel({
      picture: result[i].picture.large,
      first: result[i].name.first,
      last: result[i].name.last,
      gender: result[i].gender,
      email: result[i].email,
      phone: result[i].phone,
      cell: result[i].cell,
      location: result[i].location.street.name,
      pin: result[i].location.street.number,
      nat: result[i].nat,
    });
    user.save();
  }
}
getPost()
userRouter.get("/", async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || 0);
  const total = await UserModel.countDocuments();
  console.log(total)
  const blogs = await UserModel.find()
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  try {
    res
      .status(200)
      .send({ totalPages: Math.ceil(total / PAGE_SIZE), blogs: blogs });
  } catch (e) {
    res.status(404).send({ message: "Not Found", Error: e });
  }
});

userRouter.delete("/", async (req, res) => {
  const deletedBlogs=await UserModel.deleteMany();
console.log("Delete Blogs", deletedBlogs)
  res.send({ message: " Successfully Deleted" });
});

userRouter.get("/search/:key", async (req, res) => {
  let search = await UserModel.find(
    {
      $or: [{ gender: req.params.key }],
    }
    
  );
  res.send(search);
});

export default userRouter;