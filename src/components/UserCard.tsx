import { useState } from "react";
import axios from "axios";
import User from "../types/user";
import { MdClose } from "react-icons/md";
import BaseModal from "./BaseComponents/BaseModal";
import BaseAlert from "./BaseComponents/BaseAlert";
import UserAvatar from "./UserAvatar";
import "../assets/css/UserCard.css";

interface Props {
  userData: User;
  getUsersList: () => void;
}

function UserCard({ userData, getUsersList }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = () => {
    setIsLoading(true);
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/${userData.id}`)
      .then(() => {
        getUsersList();
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="user-card">
        <UserAvatar userData={userData} />
        <div className="user-card__info">
          <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
          <p>{userData.email}</p>
        </div>
        <button
          className="user-card__delete-btn"
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          aria-label="Delete user"
        >
          <MdClose />
        </button>
      </div>
      <BaseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={deleteUser}
        isLoading={isLoading}
      >
        <div className="user-card__modal">
          <p>
            Are you sure you want to delete user{" "}
            <b>{`${userData.firstName} ${userData.lastName}`}</b>?
          </p>
          {error ? (
            <BaseAlert alertText={error} alertType="error"></BaseAlert>
          ) : (
            <></>
          )}
        </div>
      </BaseModal>
    </>
  );
}

export default UserCard;
