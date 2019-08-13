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

// 統計データを取得する時はこっち
export const useMetricsRuns = () => {
  const allRuns = useRuns();
  const runs = allRuns.filter(
    run => getMode(run) === "normal" && !isSeeded(run)
  );
  return runs;
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

export const useRunCountsByMode = () => {
  const runs = useRuns();
  const runCounts: { [mode: string]: number } = {};

  runs.forEach(run => {
    const mode = getMode(run);
    if (runCounts[mode] === undefined) {
      runCounts[mode] = 0;
    }
    runCounts[mode]++;
  });

  return runCounts;
};

// act3を突破したかどうかを判定
// victoryフラグが経っていない時でもact4に行っていればOKにしたい
export const isAct3Victory = (run: Run): boolean => {
  const lastEnemies = run.damage_taken.slice(-1)[0];
  const defeatedInAct4 =
    lastEnemies &&
    (lastEnemies.enemies === "The Heart" ||
      lastEnemies.enemies === "Shield and Spear");

  // NOTE: この方法だとact4で手動降参した場合はカウント出来ないが、マイナーケース過ぎるので無視
  return run.victory || defeatedInAct4;
};

// 心臓に対して勝ったかどうかを判定
// floor === 57(56) で判定せずに敵を見に行っている理由は
// ポータルイベントが起きるとこれより小さい値になってしまうため。
export const isAct4Victory = (run: Run): boolean => {
  const lastEnemies = run.damage_taken.slice(-1)[0];
  return run.victory && lastEnemies.enemies === "The Heart";
};

// キャラごとの勝利回数を調べる
export const useVictoriesByChar = (level: number, startTimestamp?: number) => {
  const allRuns = useMetricsRuns();
  let runs = allRuns.filter(run => run.ascension_level === level);
  if (startTimestamp !== undefined) {
    runs = runs.filter(run => run.timestamp * 1000 >= startTimestamp);
  }

  const counts: {
    [char: string]: { runs: number; act3: number; act4: number };
  } = {};

  // 初期化
  chars.forEach(char => {
    counts[char] = {
      runs: 0,
      act3: 0,
      act4: 0
    };
  });

  runs.forEach(run => {
    const char = run.character_chosen;

    // プレイ回数
    counts[char].runs++;

    // 勝利回数
    if (isAct3Victory(run)) {
      counts[char].act3++;
    }
    if (isAct4Victory(run)) {
      counts[char].act4++;
    }
  });

  return counts;
};

// モードごとの勝利回数を調べる
export const useVictoriesByMode = (startTimestamp?: number) => {
  let runs = useRuns(); // custom, daily 等も欲しいのでメトリクス用は使わない
  if (startTimestamp !== undefined) {
    runs = runs.filter(run => run.timestamp * 1000 >= startTimestamp);
  }

  const counts: {
    [char: string]: { runs: number; act3: number; act4: number };
  } = {};
  const modes = Object.keys(modeNameMap);

  // 初期化
  modes.forEach(mode => {
    counts[mode] = {
      runs: 0,
      act3: 0,
      act4: 0
    };
  });

  runs.forEach(run => {
    const mode = getMode(run);

    // プレイ回数
    counts[mode].runs++;

    // 勝利回数
    if (isAct3Victory(run)) {
      counts[mode].act3++;
    }
    if (isAct4Victory(run)) {
      counts[mode].act4++;
    }
  });

  return counts;
};
