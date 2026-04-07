import Calcy from "./pages/Calcy";
import logo from "./assets/calcy_logo.png";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero-grid">
        <header className="app-header">
          <div className="logo-card">
            <img src={logo} alt="Calcy logo" className="brand-logo" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Modern</p>
            <h1>Calcy</h1>
            <p className="subtitle">
              Advanced expression calculator with history, memory, and scientific
              shortcuts.
            </p>
            <div className="hero-badges">
              <span>Scientific</span>
              <span>Memory + History</span>
              <span>Premium UI</span>
            </div>
          </div>
        </header>
        <Calcy />
      </section>
    </main>
  );
}

export default App;
