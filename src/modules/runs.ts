import { useEffect } from "react";
import { remote } from "electron";

import { setRuns } from "../reducers/runs";
import { useRuns } from "../rootReducer";
import { charColorMap } from "./chars";

const fs = remote.require("fs");
const path = remote.require("path");

const runsDir =
  "C:/Program Files (x86)/Steam/steamapps/common/SlayTheSpire/runs";
const chars = Object.keys(charColorMap);

export type Run = {
  ascension_level: number;
  character_chosen: string;
  [otherParams: string]: any;
};

export const modeNameMap: { [mode: string]: string } = {
  normal: "ノーマル",
  custom: "カスタム",
  daily: "デイリー",
  demo: "デモ"
};

export const getMode = (run: Run): string => {
  if (run.is_prod) return "demo";
  if (run.is_trial) return "custom";
  if (run.is_daily) return "daily";

  return "normal";
};

export const getModeName = (run: Run): string => {
  const mode = getMode(run);
  return modeNameMap[mode];
};

export const isSeeded = (run: Run): boolean => {
  return run.seed_source_timestamp === 0;
};

// 色ごとに組分けされたRUNデータを返す
export const useRunsByColor = () => {
  const runs = useRuns();
  const runsByColor: { [color: string]: Array<Run> } = {};

  runs.forEach(run => {
    const color = charColorMap[run.character_chosen];
    if (color) {
      if (runsByColor[color] === undefined) {
        runsByColor[color] = [];
      }
      runsByColor[color].push(run);
    }
  });

  return runsByColor;
};

export const useLoadRuns = (dispatch: any) => {
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

export const useRunCountsByColor = () => {
  const runsByColor = useRunsByColor();
  const runCountsByColor: { [color: string]: number } = {};

  Object.keys(runsByColor).forEach(color => {
    runCountsByColor[color] = runsByColor[color].length;
  });

  return runCountsByColor;
};

export const useMaxLevelsByColor = () => {
  const runsByColor = useRunsByColor();
  const maxLevelsByColor: { [color: string]: number } = {};

  Object.keys(runsByColor).forEach(color => {
    const levels = runsByColor[color].map(run => run.ascension_level);
    maxLevelsByColor[color] = Math.max.apply(null, levels);
  });

  return maxLevelsByColor;
};
