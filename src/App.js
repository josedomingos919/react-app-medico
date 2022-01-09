import { RootRouter } from "./routes";
import { ApplicationContext } from "./context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  return (
    <ApplicationContext>
      <RootRouter />
    </ApplicationContext>
  );
}

export default App;
