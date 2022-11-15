import "./App.scss"
import Header from "./components/Header";
import Routers from "./Routes";

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="main">
        <Routers />
      </main>
    </div>
  );
}

export default App;
