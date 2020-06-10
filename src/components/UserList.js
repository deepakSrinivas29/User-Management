import React, { useState, useEffect } from "react";
import User from "./User";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { Modal } from "react-bootstrap";
import UserForm from "./UserForm";

const UserList = () => {
  const initialUserState = {
    name: "",
    email: "",
    role: "",
  };
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSubmitButton, setFormSubmitButton] = useState("");

  const [userDetails, setUserDetails] = useState(initialUserState);
  const [currentUserId, setCurrentUserId] = useState("");

  const updateForm = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const submitAddForm = (e) => {
    e.preventDefault();

    if (formName === "Add User") {
      Axios.post("http://localhost:5000/users/", userDetails)
        .then((response) => {
          setShowForm(false);
          setUserDetails(initialUserState);
        })
        .catch((err) => console.log(err));
    } else {
      Axios.put(`http://localhost:5000/users/${currentUserId}`, userDetails)
        .then((response) => {
          setShowForm(false);
          setCurrentUserId("");
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle the UserForm Modal
  const handleCloseFrom = () => {
    setShowForm(false);
    setFormName("");
    setUserDetails(initialUserState);
  };

  const handleAddUser = () => {
    setFormName("Add User");
    setFormSubmitButton("ADD USER");
    setShowForm(true);
  };

  const handleEditUser = (id) => {
    setFormName("Edit User");
    setFormSubmitButton("SAVE CHANGES");
    setCurrentUserId(id);

    Axios.get(`http://localhost:5000/users/${id}`)
      .then((response) =>
        setUserDetails({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      )
      .catch((err) => console.log(err));
    setShowForm(true);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/users/")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, [users]);

  return (
    <>
      <Navbar handleAddUser={handleAddUser} />

      <Modal
        show={showForm}
        onHide={handleCloseFrom}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{ borderBottom: "None" }}>
          <Modal.Title>{formName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UserForm
            formSubmitButton={formSubmitButton}
            userDetails={userDetails}
            updateForm={updateForm}
            submitAddForm={submitAddForm}
          />
        </Modal.Body>
      </Modal>

      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE TYPE</th>
            {/* <th>STATUS</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} user={user} handleEditUser={handleEditUser} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
