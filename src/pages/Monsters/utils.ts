import { useMetricsRuns } from "modules/runs";

export const useStats = (level: number, char: string) => {
  // プレイデータを取得
  const allRuns = useMetricsRuns();
  const runs = allRuns.filter(
    run => run.ascension_level === level && run.character_chosen === char
  );

  // スタッツ初期化
  const stats: {
    [key: string]: {
      name: string;
      count: number;
      damage: number;
      death: number;
      turns: number;
    };
  } = {};

  runs.forEach(run => {
    run.damage_taken.forEach(monster => {
      const key = monster.enemies;

      // 初期化
      if (stats[key] === undefined) {
        stats[monster.enemies] = {
          name: monster.enemies,
          count: 0,
          damage: 0,
          death: 0,
          turns: 0
        };
      }

      stats[key].count += 1;
      stats[key].damage += monster.damage;
      stats[key].turns += monster.turns;

      if (run.killed_by === key) {
        stats[key].death += 1;
      }
    });
  });

  return stats;
};
