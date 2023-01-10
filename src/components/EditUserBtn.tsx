import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import User from "../types/user";
import { MdModeEdit } from "react-icons/md";
import BaseModal from "./BaseComponents/BaseModal";
import AddEditUserForm from "./AddEditUserForm";
import "../assets/css/AddEditUserBtn.css";
import validateUser from "../utils/validateUser";

interface Props {
  userData: User;
  getUsersList: () => void;
}

function EditUserBtn(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [userFirstName, setUserFirstName] = useState(props.userData.firstName);
  const [userLastName, setUserLastName] = useState(props.userData.lastName);
  const [userEmail, setUserEmail] = useState(props.userData.email);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = () => {
    let errorsList = validateUser(userFirstName, userLastName, userEmail);
    if (errorsList.length > 0) {
      setErrors(errorsList);
      return;
    }

    setIsLoading(true);

    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/${props.userData.id}`, {
        firstName: userFirstName.trim(),
        lastName: userLastName.trim(),
        email: userEmail.trim(),
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
  }, [userFirstName, userLastName, userEmail]);

  const openModal = () => {
    setErrors([]);
    setUserFirstName(props.userData.firstName);
    setUserLastName(props.userData.lastName);
    setUserEmail(props.userData.email);
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
      <button onClick={openModal} className="add-edit-user__delete-btn">
        <MdModeEdit />
      </button>
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
          userFirstName={userFirstName}
          setUserFirstName={setUserFirstName}
          userLastName={userLastName}
          setUserLastName={setUserLastName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          errors={errors}
        />
      </BaseModal>
    </>
  );
}

export default EditUserBtn;
