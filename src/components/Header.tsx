import AddUserBtn from "../components/AddUserBtn";
import "../assets/css/Header.css";

interface Props {
  getUsersList: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

function Header(props: Props) {
  const changeSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.setSearchInput(e.currentTarget.value);
  };

  return (
    <header className="header">
      <h1>Manage users</h1>
      <div className="header__right">
        <AddUserBtn getUsersList={props.getUsersList} />
        <input
          type="text"
          placeholder="Search"
          onChange={changeSearchInput}
          value={props.searchInput}
          className="header__search"
        />
      </div>
    </header>
  );
}

export default Header;
