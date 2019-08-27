import * as _ from "lodash";

const monsterTypes = ["WEAK", "STRONG", "ELITE", "BOSS", "EVENT"] as const;

export type MonsterType = typeof monsterTypes[number];

const monsterTypeMap: { [MT in MonsterType]: ReadonlyArray<string> } = {
  WEAK: [
    "Blue Slaver",
    "Cultist",
    "Jaw Worm",
    "2 Louse",
    "Small Slimes",
    "Chosen",
    "Shell Parasite",
    "Spheric Guardian",
    "3 Byrds",
    "2 Thieves",
    "Orb Walker",
    "3 Darklings",
    "3 Shapes"
  ],
  STRONG: [],
  ELITE: [
    "Gremlin Nob",
    "Lagavulin",
    "3 Sentries",
    "Gremlin Leader",
    "Slavers",
    "Book of Stabbing",
    "Giant Head",
    "Nemesis",
    "Reptomancer",
    "Shield and Spear"
  ],
  BOSS: [
    "The Guardian",
    "Hexaghost",
    "Slime Boss",
    "Automaton",
    "Champ",
    "Collector",
    "Awakened One",
    "Donu and Deca",
    "Time Eater",
    "The Heart"
  ],
  EVENT: [
    "Lagavulin Event",
    "The Mushroom Lair",
    "Masked Bandits",
    "Colosseum Nobs",
    "Colosseum Slavers",
    "Mysterious Sphere",
    "Mind Bloom Boss Battle",
    "2 Orb Walkers"
  ]
};

export const getMonsterType = (id: string): MonsterType => {
  const mt: MonsterType | undefined = _.find(monsterTypes, key => {
    const ids = monsterTypeMap[key];
    return ids.includes(id);
  });

  // 見つかったらそのまま、見つからなければ STRONG 扱いで返す
  return mt ? mt : "STRONG";
};
