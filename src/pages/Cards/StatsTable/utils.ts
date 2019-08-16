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
      [choice.picked, ...choice.not_picked].forEach((fullname, i) => {
        // 出現回数
        const [name] = parseCardName(fullname);
        stats.appeared(name);

        // ピック回数
        if (i === 0) {
          stats.picked(name);
        }
      });
    });
  });

  return stats.data;
};
