import { MdInfo } from "react-icons/md";
import { MdError } from "react-icons/md";
import "../../assets/css/BaseAlert.css";

interface Props {
  alertText: string;
  alertType: "info" | "error";
}

function BaseAlert(props: Props) {
  const alertStyle = {
    info: {
      border: "1px solid gray",
      color: "gray",
      backgroundColor: "rgba(128, 128, 128, 0.15)",
    },
    error: {
      border: "1px solid rgb(208, 48, 80)",
      color: "rgb(208, 48, 80)",
      backgroundColor: "rgba(208, 48, 80, 0.15)",
    },
  };
  return (
    <div className="base-alert" style={alertStyle[props.alertType]}>
      {props.alertType === "error" ? (
        <MdError style={{ fontSize: "1.2rem" }} />
      ) : (
        <MdInfo style={{ fontSize: "1.2rem" }} />
      )}
      {props.alertText}
    </div>
  );
}

export default BaseAlert;
