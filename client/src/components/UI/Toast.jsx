import { useEffect, useState } from "react";

function Toast({ message, showToast }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showToast) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showToast]);

  return <div className={`toast ${visible ? "show" : ""}`}>{message}</div>;
}

export default Toast;
