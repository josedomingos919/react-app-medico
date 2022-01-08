import { RootRouter } from "./routes";
import { ApplicationContext } from "./context";

function App() {
  return (
    <ApplicationContext>
      <RootRouter />
    </ApplicationContext>
  );
}

export default App;
