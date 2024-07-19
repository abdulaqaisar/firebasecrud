import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Home.css";
import { onValue, push, ref, remove, update } from "firebase/database";
import { fireDb } from "../firebase";
import { toast } from "react-toastify";
const Home = () => {
  
  let navigate = useNavigate();
  const [data, setData] = useState("");

  //  Getting data from the fire base 
  useEffect(() => {
    let getdata = async () => {
      const starCountRef = ref(fireDb, `User`);
      onValue(starCountRef, async (snapshot) => {
        let fetchdata = await snapshot.val();
        console.log(fetchdata);
        setData(fetchdata);
      });
    };
    getdata();
  }, []);
//  after getting data we delete data from firebase by using (id) 
  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        await remove(ref(fireDb, `User/${id}`));
        toast.success("Profile deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.warn("Error deleting profile");
      }
    }
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => {
                        onDelete(id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
