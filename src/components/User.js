import React from "react";
import ico_edit from "../assets/ico_edit.svg";

const User = ({ user, handleEditUser }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      {/* <td>{user.status}</td> */}
      <td>
        <img
          src={ico_edit}
          alt="edit"
          onClick={() => handleEditUser(user._id)}
        />
      </td>
    </tr>
  );
};

export default User;
