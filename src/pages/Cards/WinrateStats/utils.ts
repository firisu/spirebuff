import * as _ from "lodash";

import { parseCardName } from "modules/cards";
import { useMetricsRuns, isAct3Victory, isAct4Victory } from "modules/runs";

import { Stats } from "./types";

export const useStats = (level: number, char: string) => {
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(
    run => run.ascension_level === level && run.character_chosen === char
  );
  const stats = new Stats();

  runs.forEach(run => {
    // 枚数を計算
    const parsedMasterDeck = _.map(run.master_deck, fullname => {
      const [name] = parseCardName(fullname);
      return name;
    });
    parsedMasterDeck.forEach(name => {
      stats.incr("count", name);
    });

    // 勝率の計算
    const uniqDeck = _.uniq(parsedMasterDeck);
    if (isAct3Victory(run)) {
      uniqDeck.forEach(name => {
        stats.incr("act3won", name);
      });
      if (isAct4Victory(run)) {
        uniqDeck.forEach(name => {
          stats.incr("act4won", name);
        });
      }
    } else {
      uniqDeck.forEach(name => {
        stats.incr("defeated", name);
      });
    }
  });

  return stats.data;
};
