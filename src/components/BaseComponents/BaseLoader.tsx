import { useEffect, useState } from "react";
import "../../assets/css/BaseLoader.css";

interface Props {
  size: "sm" | "md";
}

function BaseLoader(props: Props) {
  const [showLazyLoader, setShowLazyLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLazyLoader(true), 100);
  }, []);

  return (
    <div className="loader" style={showLazyLoader ? {} : { display: "none" }}>
      <div
        className={`loader__ring ${
          props.size === "md" ? "loader__md" : "loader__sm"
        }`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default BaseLoader;
