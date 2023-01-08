import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {Button} from "react-bootstrap"
import "../styles/Users.css";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [data, setData] = useState([]);
   
  const [activePage, setactivePage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  const pages = new Array(totalPages).fill(null).map((v,i) => i);
  console.log(pages)

  useEffect(() => {
    getDataFunction();
  }, [activePage]);
  const getDataFunction = () => {
    axios.get(`http://localhost:8080/user?page=${activePage}`)
      .then((res) => {
        settotalPages(res.data.totalPages);
        setData(res.data.blogs);

        // console.log(res.data.blogs)
      })
      .catch((e) => console.log(e));
  };


  const Previous = () => {
   setactivePage( activePage - 1);
  };
  const Next = () => {
   setactivePage( activePage + 1);
  };

  const filterByGender = (e) => {
    axios.get(`http://localhost:8080/user/search/${e.target.value}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data)
        console.log(e.target.value);
        if (e.target.value === "Filter by Gender") {
          getDataFunction();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container_div">
      <div className="filterdiv">
        <div>
          <select className="filter" onChange={filterByGender}>
            <option>Filter by Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <input
            className="search"
            type="text"
            placeholder="Filter by Name..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="userTable_div">
        <table className="userTable">
          <thead>
            <tr>
              <th> Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cell</th>
              <th>Location</th>
              <th>Nationality</th>
              <th>Pin</th>
            </tr>
          </thead>
          {data
            .filter((value) => {
              if (searchTerm === "") {
                return value;
              } else if (
                value.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                value.last.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item) => {
              return (
                <tbody key={item._id}>
                  <tr>
                    <td>
                      <img src={item.picture} alt="img" />
                    </td>
                    <td>{item.first}</td>
                    <td>{item.last}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.cell}</td>
                    <td>{item.location}</td>
                    <td>{item.nat}</td>
                    <td>{item.pin}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

      <div className="pagination_container">
        <div className="pagination">
          <Button onClick={Previous}>Previous</Button>
          {pages.map((index, i) => (
            <Button key={i} onClick={() => setactivePage(index)}>
              {index + 1}
            </Button>
          ))}
          <Button onClick={Next}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
