import { KeyboardEvent } from "react";
import BaseAlert from "./BaseComponents/BaseAlert";
import "../assets/css/AddEditUserForm.css";

interface Props {
  handleKeypress: (e: KeyboardEvent<HTMLDivElement>) => void;
  newUserFirstName: string;
  setNewUserFirstName: (arg0: string) => void;
  newUserLastName: string;
  setNewUserLastName: (arg0: string) => void;
  newUserEmail: string;
  setNewUserEmail: (arg0: string) => void;
  errors: string[];
}

function AddEditUserForm(props: Props) {
  return (
    <>
      <h2 className="add-edit-user-form__h2">Add user</h2>
      <form className="add-edit-user-form__form">
        <label>
          <span>First name</span>
          <input
            type="text"
            value={props.newUserFirstName}
            onChange={(e) => props.setNewUserFirstName(e.target.value)}
            onKeyDown={props.handleKeypress}
            autoFocus
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            type="text"
            value={props.newUserLastName}
            onChange={(e) => props.setNewUserLastName(e.target.value)}
            onKeyDown={props.handleKeypress}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="text"
            value={props.newUserEmail}
            onChange={(e) => props.setNewUserEmail(e.target.value)}
            onKeyDown={props.handleKeypress}
          />
        </label>
      </form>
      {props.errors.length ? (
        <div className="add-edit-user-form__alert">
          {props.errors.map((error, id) => (
            <BaseAlert key={id} alertText={error} alertType="error"></BaseAlert>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddEditUserForm;
