import React from "react";

import { useRuns } from "./rootReducer";

const App: React.FC = () => {
  const runs = useRuns();
  const runCount = Object.values(runs).flat().length;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          run files count: {runCount}
        </a>
      </header>
    </div>
  );
};

export default App;
