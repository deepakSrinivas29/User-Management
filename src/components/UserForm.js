import React from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

const UserForm = ({
  formSubmitButton,
  userDetails,
  updateForm,
  submitAddForm,
  formName,
  deleteUser,
}) => {
  const { name, email } = userDetails;

  const deleteButton = {
    visibility: formName === "Add User" ? "hidden" : "visible",
  };

  return (
    <Form style={formStyle} onSubmit={submitAddForm}>
      <FormGroup>
        <Input
          className="m-3"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={updateForm}
        />
        <Input
          className="m-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={updateForm}
        />
      </FormGroup>

      <FormGroup className="m-3" check inline>
        <Label check>
          <Input type="radio" name="role" value="Admin" onChange={updateForm} />{" "}
          Admin
        </Label>
      </FormGroup>
      <FormGroup check inline>
        <Label check>
          <Input
            type="radio"
            name="role"
            value="Customer Executive"
            onChange={updateForm}
          />{" "}
          Customer Executive
        </Label>
      </FormGroup>

      <FormGroup inline>
        <Button className="btn btn-primary btn-sm btn-block m-3">
          {formSubmitButton}
        </Button>

        <Button
          className="btn btn-primary btn-sm btn-block m-3"
          style={deleteButton}
          onClick={deleteUser}
        >
          Delete
        </Button>
      </FormGroup>
    </Form>
  );
};

const formStyle = {
  width: "100%",
  maxWidth: "300px",
  margin: "auto",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

export default UserForm;
