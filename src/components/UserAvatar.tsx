import chroma from "chroma-js";
import stc from "string-to-color";
import User from "../types/user";
import "../assets/css/UserAvatar.css";

interface Props {
  userData: User;
}

function UserAvatar({ userData }: Props) {
  let userInitials = `${userData.firstName
    .charAt(0)
    .toUpperCase()}${userData.lastName.charAt(0).toUpperCase()}`;

  const avatarStyle = {
    backgroundColor: chroma(stc(userData.id)).alpha(0.5).hex(),
    color: stc(userData.id),
  };

  return (
    <div className="user-avatar" style={avatarStyle}>
      {userInitials}
    </div>
  );
}
export default UserAvatar;
