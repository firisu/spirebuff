import * as _ from "lodash";

import { useRelics, RelicTier } from "modules/relics";
import { useMetricsRuns, isAct3Victory, isAct4Victory } from "modules/runs";

import { Stats, SortString, SortDirection } from "./types";

export const useStats = (
  level: number,
  char: string,
  tiers: ReadonlyArray<RelicTier>
) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(
    run => run.ascension_level === level && run.character_chosen === char
  );

  // スタッツの初期化
  const stats = new Stats("picked", "act3won", "act4won");

  // スタッツの計算
  runs.forEach(run => {
    const act3won = isAct3Victory(run);
    const act4won = isAct4Victory(run);

    run.relics.forEach((id: string) => {
      stats.initStat(id);

      // ピック回数
      stats.incr(id, "picked");

      // act3勝利
      if (act3won) {
        stats.incr(id, "act3won");
      }

      // act4勝利
      if (act4won) {
        stats.incr(id, "act4won");
      }
    });
  });

  // 全てのレリックデータを取得
  const { getAllRelicInfo } = useRelics();
  const allRelics = getAllRelicInfo();

  // ティアーでフィルタリング
  const data = _.pickBy(stats.data, (v, id) =>
    tiers.includes(allRelics[id].tier)
  );

  return data;
};

export const useSortedStats = (
  level: number,
  char: string,
  tiers: ReadonlyArray<RelicTier>,
  sort: SortString,
  direction: SortDirection
) => {
  const stats = useStats(level, char, tiers);

  // レリックの名前取得用
  const { getAllRelicInfo } = useRelics();
  const allRelics = getAllRelicInfo();

  // ソートキーの準備
  let sortedKeys: string[];
  if (sort === "name") {
    sortedKeys = _.sortBy(Object.keys(stats), id => allRelics[id].name);
  } else if (sort === "act3won") {
    sortedKeys = _.sortBy(Object.keys(stats), id =>
      stats[id].picked === 0 ? 0 : stats[id][sort] / stats[id].picked
    );
  } else if (sort === "act4won") {
    sortedKeys = _.sortBy(Object.keys(stats), id =>
      stats[id].picked === 0 ? 0 : stats[id][sort] / stats[id].picked
    );
  } else {
    sortedKeys = _.sortBy(Object.keys(stats), id => stats[id][sort]);
  }

  // 降順なら逆にする
  if (direction === "descending") {
    sortedKeys = sortedKeys.reverse();
  }

  // ソートしたスタッツの作成
  const sortedStats: typeof stats = {};
  sortedKeys.forEach(key => {
    sortedStats[key] = stats[key];
  });

  return sortedStats;
};
