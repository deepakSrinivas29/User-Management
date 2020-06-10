import React from "react";
import ico_users from "../assets/ico_users.svg";
import ico_add from "../assets/ico_add.svg";

const Navbar = ({ handleAddUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h2 className="navbar-brand">
        <img src={ico_users} alt="" /> Users
      </h2>

      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item m-1">
            <input type="text" placeholder="Search"></input>
          </li>
          <li className="nav-item m-1">
            <button className="btn btn-primary" onClick={handleAddUser}>
              <img src={ico_add} alt="" /> Add User
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
