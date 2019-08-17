import * as _ from "lodash";

import { parseCardName } from "modules/cards";
import { useMetricsRuns } from "modules/runs";

import { Stats } from "./types";

export const useStats = (level: number, char: string) => {
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(
    run => run.ascension_level === level && run.character_chosen === char
  );
  const stats = new Stats();

  runs.forEach(run => {
    // ピック率の計算
    run.card_choices.forEach(choice => {
      // ピックしなかったカードは出現回数のみ加算
      choice.not_picked.forEach(fullname => {
        const [name] = parseCardName(fullname);
        stats.incr("appeared", name);
      });

      // ピックしたカードは両方加算
      const [name] = parseCardName(choice.picked);
      if (name !== "SKIP" && name !== "Singing Bowl") {
        stats.incr("appeared", name);
        stats.incr("picked", name);
      }
    });
  });

  return stats.data;
};
