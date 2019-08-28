import * as _ from "lodash";

import { CharacterName, characterNames } from "modules/chars";
import { useMetricsRuns, isAct4Victory } from "modules/runs";
import { getMonsterType } from "modules/monsters";

export const useAltWinStreak = (level: number) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(run => run.ascension_level === level);

  let maxStreak = 0;
  let currentStreak = 0;
  let lastChar: CharacterName;

  runs.forEach(run => {
    const char = run.character_chosen;

    // キャラが同じだったらリセット
    if (lastChar === char) {
      currentStreak = 0;
    }

    if (isAct4Victory(run)) {
      currentStreak += 1;
    } else {
      currentStreak = 0;
    }

    // 最大記録更新
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }

    // 前回のキャラとして保存
    lastChar = char;
  });

  return maxStreak;
};

export const useAct4WinStreaks = (level: number) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(run => run.ascension_level === level);

  let maxStreaks: { [CN in CharacterName]: number } = {
    IRONCLAD: 0,
    THE_SILENT: 0,
    DEFECT: 0
  };
  let currentStreaks: { [CN in CharacterName]: number } = {
    IRONCLAD: 0,
    THE_SILENT: 0,
    DEFECT: 0
  };

  runs.forEach(run => {
    const name = run.character_chosen;
    if (isAct4Victory(run)) {
      currentStreaks[name] += 1;
    } else {
      currentStreaks[name] = 0;
    }

    if (currentStreaks[name] > maxStreaks[name]) {
      maxStreaks[name] = currentStreaks[name];
    }
  });

  return maxStreaks;
};

export const useMaxScores = (level: number) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(run => run.ascension_level === level);

  // 初期化
  let maxScores: { [CN in CharacterName]: number } = {
    IRONCLAD: 0,
    THE_SILENT: 0,
    DEFECT: 0
  };

  runs.forEach(run => {
    const name = run.character_chosen;
    if (maxScores[name] === undefined) {
      maxScores[name] = 0;
    }
    if (run.score > maxScores[name]) {
      maxScores[name] = run.score;
    }
  });

  return maxScores;
};

export const useAvgStats = (level: number) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(run => run.ascension_level === level);

  // 初期化
  let stats: {
    [CN in CharacterName]: {
      count: number;
      elite: number;
      score: number;
      deckVolume: number;
      relic: number;
      campRest: number;
      campSmith: number;
    };
  } = _.reduce(
    characterNames,
    (acc, char) => ({
      ...acc,
      [char]: {
        count: 0,
        elite: 0,
        score: 0,
        deckVolume: 0,
        relic: 0,
        campRest: 0,
        campSmith: 0
      }
    }),
    {} as any
  );

  runs.forEach(run => {
    const char = run.character_chosen;

    // プレイ回数
    stats[char].count += 1;

    // エリート討伐数
    stats[char].elite += run.damage_taken.filter(damage => {
      const mt = getMonsterType(damage.enemies);
      return mt === "ELITE";
    }).length;

    // スコア
    stats[char].score += run.score;

    // デッキ枚数
    stats[char].deckVolume += run.master_deck.length;

    // レリック数
    stats[char].relic += run.relics.length;

    // 休憩
    stats[char].campRest += run.campfire_choices.filter(cc => {
      return cc.key === "REST";
    }).length;

    // 鍛冶
    stats[char].campSmith += run.campfire_choices.filter(cc => {
      return cc.key === "SMITH";
    }).length;
  });

  return stats;
};
