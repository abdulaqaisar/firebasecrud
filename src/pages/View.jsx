import React, { useState, useEffect } from "react";
import { fireDb } from "../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import './View.css'
const View = () => {
  let navigate = useNavigate();
  let [user, setUser] = useState("");
  const { id } = useParams();
  useEffect(() => {
    let getdata = async () => {
      const starCountRef = ref(fireDb, `User/${id}`);
      onValue(starCountRef, async (snapshot) => {
        let fetchdata = await snapshot.val();
        console.log(fetchdata);
        setUser(fetchdata);
      });
    };
    getdata();
  }, []);
  return <div>
    <div className="card" >
      <div className="card-header">
        <h1>User Details</h1>
      </div>
      <div className="userdetails">
      <div style={{ display:'flex',flexDirection:"row" }}>
        <h2>Name:</h2>
        <h2>{user.name}</h2>
        <br /><br />
      </div>
      <div style={{ display:'flex',flexDirection:"row" }}>
        <h2>Email: </h2>
        <h2>{user.email}</h2>
        <br /><br />
      </div>
      <div style={{ display:'flex',flexDirection:"row" }}>
        <h2>Contact:</h2>
        <h2>{user.contact}</h2>
        <br /><br />
      </div>
      <Link to={'/'}>
      <button className="btn btn-edit" style={{ marginTop:"30%" }}>Go Back</button>
      </Link>
      </div>
    </div>
  </div>;
};

export default View;
