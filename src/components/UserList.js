import React, { useState, useEffect } from "react";
import User from "./User";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { Modal } from "react-bootstrap";
import UserForm from "./UserForm";
import ico_sorting from "../assets/ico_sorting.svg";

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

  // submit the form
  const submitAddForm = (e) => {
    e.preventDefault();

    if (formName === "Add User") {
      Axios.post("http://localhost:5000/users/", userDetails)
        .then((response) => {
          setShowForm(false);
          setUserDetails(initialUserState);
          setUsers((users) => [...users, response.data]);
        })
        .catch((err) => console.log(err));
    } else {
      Axios.put(`http://localhost:5000/users/${currentUserId}`, userDetails)
        .then((response) => {
          setShowForm(false);
          setUsers((users) => {
            let myUsers = users.filter((user) => user._id !== currentUserId);
            return [...myUsers, response.data];
          });
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

  // Add User button
  const handleAddUser = () => {
    setFormName("Add User");
    setFormSubmitButton("ADD USER");
    setShowForm(true);
  };

  // Edit user button
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

  // Sort alphabetically
  const handleSort = () => {
    Axios.get("http://localhost:5000/users/sorted")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
    // setUsers((users) =>
    //   users.sort((a, b) => {
    //     if (a.name < b.name) {
    //       return -1;
    //     }
    //     return 1;
    //   })
    // );
  };

  // Delete User
  const deleteUser = () => {
    Axios.delete(`http://localhost:5000/users/${currentUserId}`)
      .then((response) => {
        console.log(response.data);
        setShowForm(false);
        setUsers((users) => users.filter((user) => user._id !== currentUserId));
        setCurrentUserId("");
        setUserDetails(initialUserState);
      })
      .catch((err) => console.log(err));
  };

  // Runs once
  useEffect(() => {
    Axios.get("http://localhost:5000/users/")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

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
            formName={formName}
            deleteUser={deleteUser}
          />
        </Modal.Body>
      </Modal>

      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th>
              NAME <img src={ico_sorting} alt="" onClick={handleSort} />
            </th>
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
