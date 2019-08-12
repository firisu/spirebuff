import { useEffect } from "react";
import { remote } from "electron";

import { Run, setRuns } from "../reducers/runs";

const fs = remote.require("fs");
const path = remote.require("path");

const runsDir =
  "C:/Program Files (x86)/Steam/steamapps/common/SlayTheSpire/runs";
const chars = ["IRONCLAD", "THE_SILENT", "DEFECT"];

export const useRuns = dispatch => {
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
  }, [dispatch]);
};
