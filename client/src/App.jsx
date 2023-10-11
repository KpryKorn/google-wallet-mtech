import DesktopView from "./components/Views/DesktopView";
import AppleView from "./components/Views/AppleView";
import AndroidView from "./components/Views/AndroidView";
import { isUserAgentMobile, isUserAgentIOS } from "./lib/utils";

function App() {
  const isMobile = isUserAgentMobile();
  const isIOS = isUserAgentIOS();

  return isMobile ? isIOS ? <AppleView /> : <AndroidView /> : <DesktopView />;
}

export default App;
