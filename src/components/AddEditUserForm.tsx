import { KeyboardEvent } from "react";
import BaseAlert from "./BaseComponents/BaseAlert";
import "../assets/css/AddEditUserForm.css";

interface Props {
  handleKeypress: (e: KeyboardEvent<HTMLDivElement>) => void;
  userFirstName: string;
  setUserFirstName: (arg0: string) => void;
  userLastName: string;
  setUserLastName: (arg0: string) => void;
  userEmail: string;
  setUserEmail: (arg0: string) => void;
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
            value={props.userFirstName}
            onChange={(e) => props.setUserFirstName(e.target.value)}
            onKeyDown={props.handleKeypress}
            autoFocus
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            type="text"
            value={props.userLastName}
            onChange={(e) => props.setUserLastName(e.target.value)}
            onKeyDown={props.handleKeypress}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="text"
            value={props.userEmail}
            onChange={(e) => props.setUserEmail(e.target.value)}
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
