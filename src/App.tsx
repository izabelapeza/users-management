import { useEffect, useState } from "react";
import axios from "axios";
import User from "./types/user";
import UserCard from "./components/UserCard";
import BaseAlert from "./components/BaseComponents/BaseAlert";
import BaseLoader from "./components/BaseComponents/BaseLoader";
import Header from "./components/Header";
import "./assets/css/UserList.css";

function App() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const trimmedLowerCaseSearchValue = searchInput
    .toLocaleLowerCase()
    .replace(/\s+/g, "");

  const includesSearchValue = (val: string) =>
    val.toLocaleLowerCase().includes(trimmedLowerCaseSearchValue);

  const filteredUsersList =
    trimmedLowerCaseSearchValue.length === 0
      ? usersList
      : usersList.filter((user) => {
          return (
            includesSearchValue(user.firstName + user.lastName) ||
            includesSearchValue(user.lastName + user.firstName)
          );
        });

  const getUsersList = () => {
    setError(null);
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_SERVER_URL)
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="app">
      <Header
        getUsersList={getUsersList}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {error ? (
        <BaseAlert alertText={error} alertType="error"></BaseAlert>
      ) : filteredUsersList.length === 0 && usersList.length > 0 ? (
        <BaseAlert
          alertText={`No results for "${searchInput}"`}
          alertType="info"
        />
      ) : (
        <div className="user-list">
          {filteredUsersList.map((user) => (
            <UserCard
              key={user.id}
              userData={user}
              getUsersList={getUsersList}
            />
          ))}
        </div>
      )}
      {isLoading ? <BaseLoader size="md" /> : <></>}
    </div>
  );
}

export default App;
