import DesktopView from "./components/Views/DesktopView";
import AppleView from "./components/Views/AppleView";
import AndroidView from "./components/Views/AndroidView";
import { isUserAgentMobile, isUserAgentIOS } from "./lib/utils";
import { useEffect, useState } from "react";

function App() {
  const [appleData, setAppleData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/apple")
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setAppleData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const isMobile = isUserAgentMobile();
  const isIOS = isUserAgentIOS();

  // return isMobile ? isIOS ? <AppleView /> : <AndroidView /> : <DesktopView />;
  return appleData;
}

export default App;
