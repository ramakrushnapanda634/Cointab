import React,{useState,useEffect} from 'react'
import {Button} from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const Home = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = () => {
    axios
      .get("https://cointab-backend-rama.onrender.com/user")
      .then((res) => {
        let arr = res.data.blogs;
        if (arr.length === 0) {
          setSuccess(false);
          getBlogs();
        } else {
          setSuccess(true);
        }
      })
      .catch((e) => console.log(e));
  };
  //http://localhost:8080
  const fetchUsers = () => {
    if (success === false) {
      axios
        .post("https://cointab-backend-rama.onrender.com/user")
        .then((res) => {
          getBlogs();
          setSuccess(true);
        });
      toast.success("Successfully Data Added");
    } else {
      toast.error("Data Already Present");
    }
  };
  const deleteUsers = () => {
    if (success === true) {
      axios
        .delete("https://cointab-backend-rama.onrender.com/user")
        .then((res) => {
          getBlogs();
        });
      toast.success("Data Successfully Deleted");
    } else {
      toast.success("Data is Empty");
    }
  };
  const UserDetails = () => {
    navigate("/users");
  };
  return (
    <>
      <div className="container mt-5 d-flex justify-content-between">
        <Button variant="success" onClick={fetchUsers}>
          Fetch Users
        </Button>{" "}
        <Button variant="danger" onClick={deleteUsers}>
          Delete Users
        </Button>{" "}
        <Button variant="info" onClick={UserDetails}>
          User Details
        </Button>{" "}
        <ToastContainer position="top-center" />
      </div>
    </>
  );
}

export default Home