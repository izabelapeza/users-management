import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import { MdOutlinePersonAdd } from "react-icons/md";
import BaseButton from "./BaseComponents/BaseButton";
import BaseModal from "./BaseComponents/BaseModal";
import "../assets/css/AddUserBtn.css";
import AddEditUserForm from "./AddEditUserForm";

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

  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateUser = () => {
    let errorsList = [];

    if (!newUserFirstName || !newUserLastName || !newUserEmail) {
      errorsList.push("Required data missing");
    }
    if (newUserEmail && !emailValidation.test(newUserEmail)) {
      errorsList.push("Invalid email");
    }
    if (newUserFirstName.length > 35) {
      errorsList.push("The maximum first name length is 35");
    }
    if (newUserLastName.length > 35) {
      errorsList.push("The maximum last name length is 35");
    }
    if (newUserEmail.length > 35) {
      errorsList.push("The maximum email length is 60");
    }

    if (errorsList.length > 0) setErrors(errorsList);
    else addUser();
  };

  const addUser = () => {
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
      validateUser();
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
        onSubmit={validateUser}
        isLoading={isLoading}
      >
        <AddEditUserForm
          handleKeypress={handleKeypress}
          newUserFirstName={newUserFirstName}
          setNewUserFirstName={setNewUserFirstName}
          newUserLastName={newUserLastName}
          setNewUserLastName={setNewUserLastName}
          newUserEmail={newUserEmail}
          setNewUserEmail={setNewUserEmail}
          errors={errors}
        />
      </BaseModal>
    </>
  );
}

export default AddUserBtn;
