import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import { MdOutlinePersonAdd } from "react-icons/md";
import BaseButton from "./BaseComponents/BaseButton";
import BaseModal from "./BaseComponents/BaseModal";
import BaseAlert from "./BaseComponents/BaseAlert";
import "../assets/css/AddUserBtn.css";

interface Props {
  getUsersList: () => void;
}

function AddUserBtn(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const addUser = () => {
    if (!newUserFirstName || !newUserLastName || !newUserEmail) {
      setError("Required data missing");
      return;
    } else if (!emailValidation.test(newUserEmail)) {
      setError("Invalid email");
      return;
    }

    setIsLoading(true);

    axios
      .post(import.meta.env.VITE_SERVER_URL, {
        firstName: newUserFirstName.trim(),
        lastName: newUserLastName.trim(),
        email: newUserEmail.trim(),
      })
      .then(() => {
        props.getUsersList();
        setShowModal(false);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setError(null);
  }, [newUserFirstName, newUserLastName, newUserEmail]);

  const openModal = () => {
    setError(null);
    setNewUserFirstName("");
    setNewUserLastName("");
    setNewUserEmail("");
    setShowModal(true);
  };

  const handleKeypress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      addUser();
    }
  };
  return (
    <>
      <BaseButton size="md" color="blue" onClick={openModal}>
        <div className="add-user__btn">
          <MdOutlinePersonAdd />
          <span>Add user</span>
        </div>
      </BaseButton>
      <BaseModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onSubmit={addUser}
        isLoading={isLoading}
      >
        <>
          <h2 className="add-user__h2">Add user</h2>
          <form className="add-user__form">
            <label>
              <span>First name</span>
              <input
                type="text"
                value={newUserFirstName}
                onChange={(e) => setNewUserFirstName(e.target.value)}
                onKeyDown={handleKeypress}
                autoFocus
              />
            </label>
            <label>
              <span>Last name</span>
              <input
                type="text"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
                onKeyDown={handleKeypress}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="text"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                onKeyDown={handleKeypress}
              />
            </label>
          </form>
          {error ? (
            <div className="add-user__alert">
              <BaseAlert alertText={error} alertType="error"></BaseAlert>
            </div>
          ) : (
            <></>
          )}
        </>
      </BaseModal>
    </>
  );
}

export default AddUserBtn;
