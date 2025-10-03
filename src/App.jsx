import Root from "./components/Root";
import { ValueProvider } from "./components/ValueContext";

function App() {
  return (
    <>
      <ValueProvider>
        <Root />
      </ValueProvider>
    </>
  );
}

export default App;
