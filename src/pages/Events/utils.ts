import * as _ from "lodash";

import eventsJson from "data/events.json";

import { useLocalization } from "modules/localization";
import { useMetricsRuns, isAct3Victory, isAct4Victory } from "modules/runs";

export const useStats = (level: number, char: string) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(
    run => run.ascension_level === level && run.character_chosen === char
  );

  // イベント用ローカリ
  const { eventL } = useLocalization();

  // スタッツ初期化
  const stats: {
    [key: string]: {
      name: string;
      count: number;
      choices: {
        [choiceKey: string]: {
          count: number;
          act3won: number;
          act4won: number;
        };
      };
    };
  } = {};

  runs.forEach(run => {
    const act3victory = isAct3Victory(run);
    const act4victory = isAct4Victory(run);

    run.event_choices.forEach(event_choice => {
      const { event_name, player_choice } = event_choice;
      const event = (eventsJson as any)[event_name];
      if (event === undefined) {
        // console.log("イベント", event_name, "が見つかりません");
        return;
      }
      const choices = event.choices;

      // 初期化
      if (stats[event_name] === undefined) {
        stats[event_name] = {
          name: eventL(event_name).NAME || "",
          count: 0,
          choices: _.reduce(
            choices,
            (acc, choice) => ({
              ...acc,
              [choice]: { count: 0, act3won: 0, act4won: 0 }
            }),
            {}
          )
        };
      }

      if (stats[event_name].choices[player_choice] === undefined) {
        // console.log("プレイヤー選択", player_choice, "が見つかりません");
        return;
      }

      // カウント
      stats[event_name].count++;
      stats[event_name].choices[player_choice].count++;
      if (act3victory) stats[event_name].choices[player_choice].act3won++;
      if (act4victory) stats[event_name].choices[player_choice].act4won++;
    });
  });

  return stats;
};
