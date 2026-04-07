import Calcy from "./pages/Calcy";
import logo from "./assets/calcy_logo.png";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="logo-card">
          <img src={logo} alt="Calcy logo" className="brand-logo" />
        </div>
        <div>
          <p className="eyebrow">Modern</p>
          <h1>Calcy</h1>
          <p className="subtitle">
            Advanced expression calculator with history, memory, and scientific
            shortcuts.
          </p>
        </div>
      </header>
      <Calcy />
    </main>
  );
}

export default App;
