import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { fireDb } from "../firebase";
import { onValue, push, ref, update } from "firebase/database";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEditContent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const starCountRef = ref(fireDb, `User/${id}`);
    const getData = async () => {
      onValue(starCountRef, (snapshot) => {
        const fetchData = snapshot.val();
        console.log("Fetched Data: ", fetchData);
        setData(fetchData);
      });
    };
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setState(data);
    }
  }, [data, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.contact) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const contactsRef = ref(fireDb, "User");
      const newContactRef = push(contactsRef);
      const pushKey = newContactRef.key;
      // console.log( "this is " , pushKey);
      const updates = {
        id: pushKey,
        ...state,
      };
      await update(newContactRef, updates);
      toast.success("Form submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Error adding contact.");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await update(ref(fireDb, `User/${id}`), {
        ...state,
      });
      toast.success("User data updated successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error updating user data: ", error);
      toast.error("Error updating user data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const { name, email, contact } = state;

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          width: "100%",
          alignItems: "center",
        }}
        onSubmit={id ? handleUpdateUser : handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Your Contact..."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type="submit" name="submit" id="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditContent;
