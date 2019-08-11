import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { remote } from "electron";

import logo from "./logo.svg";
import "./App.css";

import { useRuns } from "./rootReducer";
import { Run, setRuns } from "./reducers/runs";

const runsDir =
  "C:/Program Files (x86)/Steam/steamapps/common/SlayTheSpire/runs";
const chars = ["IRONCLAD", "THE_SILENT", "DEFECT"];

const fs = remote.require("fs");
const path = remote.require("path");

const App: React.FC = () => {
  const dispatch = useDispatch();

  // RUNファイルを全部読み込む
  useEffect(() => {
    const runs: { [timestamp: string]: {} } = {};
    chars.forEach(char => {
      const runfiles = fs.readdirSync(path.join(runsDir, char));

      runfiles.forEach((runfile: string) => {
        const fullPath = path.join(runsDir, char, runfile);
        const json = JSON.parse(
          fs.readFileSync(fullPath, { encoding: "utf-8" })
        );
        runs[json.timestamp] = json;
      });
    });
    const allRuns: ReadonlyArray<Run> = Object.values(runs) as Run[];
    dispatch(setRuns(allRuns));
  });

  const runs = useRuns();
  const runCount = Object.values(runs).flat().length;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
