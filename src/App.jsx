import Calcy from "./pages/Calcy";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
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
