import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import { MdOutlinePersonAdd } from "react-icons/md";
import BaseButton from "./BaseComponents/BaseButton";
import BaseModal from "./BaseComponents/BaseModal";
import AddEditUserForm from "./AddEditUserForm";
import "../assets/css/AddEditUserBtn.css";
import validateUser from "../utils/validateUser";

interface Props {
  getUsersList: () => void;
}

function AddUserBtn(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addUser = () => {
    let errorsList = validateUser(
      newUserFirstName,
      newUserLastName,
      newUserEmail
    );
    if (errorsList.length > 0) {
      setErrors(errorsList);
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
      .catch((error) => setErrors((prev) => [...prev, error.message]))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setErrors([]);
  }, [newUserFirstName, newUserLastName, newUserEmail]);

  const openModal = () => {
    setErrors([]);
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
        <div className="add-edit-user__add-btn">
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
        <AddEditUserForm
          handleKeypress={handleKeypress}
          userFirstName={newUserFirstName}
          setUserFirstName={setNewUserFirstName}
          userLastName={newUserLastName}
          setUserLastName={setNewUserLastName}
          userEmail={newUserEmail}
          setUserEmail={setNewUserEmail}
          errors={errors}
        />
      </BaseModal>
    </>
  );
}

export default AddUserBtn;
