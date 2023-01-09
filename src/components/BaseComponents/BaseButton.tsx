import "../../assets/css/BaseButton.css";

interface Props {
  onClick: () => void;
  children: JSX.Element;
  size: "sm" | "md";
  color: "green" | "blue" | "red";
}

function BaseButton(props: Props) {
  const colors = {
    green: { backgroundColor: "#18a058" },
    blue: { backgroundColor: "#2080f0" },
    red: { backgroundColor: "#d03050" },
  };

  const btnStyle = () => {
    let style =
      props.size === "sm"
        ? { padding: "0.25rem 0.5rem", borderRadius: "0.1rem" }
        : { padding: "0.55rem 1.25rem", borderRadius: "0.25rem" };

    style = { ...style, ...colors[props.color] };

    return style;
  };

  return (
    <button className="base-btn" onClick={props.onClick} style={btnStyle()}>
      {props.children}
    </button>
  );
}

export default BaseButton;
