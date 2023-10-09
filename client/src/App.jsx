import DesktopView from "./components/Views/DesktopView";
import MobileView from "./components/Views/MobileView";
import { isUserAgentMobile } from "./lib/utils";

function App() {
  return <>{isUserAgentMobile() ? <MobileView /> : <DesktopView />}</>;
  // return <MobileView />;
}

export default App;
