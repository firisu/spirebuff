import React from "react";
import * as _ from "lodash";

import { useLocalization } from "modules/localization";
import { getMonsterType } from "modules/monsters";

interface Prop {
  id: string;
}

const idToRunHistoryNameIndex: { [id: string]: number } = {
  "Gremlin Gang": 0,
  "Large Slime": 1,
  "Exordium Thugs": 2,
  "Exordium Wildlife": 3,
  "Lots of Slimes": 4,
  "Small Slimes": 5,
  "2 Thieves": 6,
  "3 Byrds": 7,
  "4 Byrds": 8,
  "3 Cultists": 9,
  "Chosen and Byrds": 10,
  "Sentry and Sphere": 11,
  "Centurion and Healer": 12,
  "Shelled Parasite and Fungi": 13,
  "Masked Bandits": 14,
  "Colosseum Nobs": 15,
  "Colosseum Slavers": 16,
  "3 Shapes": 17,
  "Jaw Worm Horde": 18,
  "4 Shapes": 19,
  "Sphere and 2 Shapes": 20,
  "2 Orb Walkers": 21,
  "Donu and Deca": 22,
  "3 Sentries": 23,
  "Cultist and Chosen": 24,
  DEPRE1: 25,
  DEPRE2: 26,
  DEPRE3: 27,
  "Shield and Spear": 28
};

const idToAnotherId: { [id: string]: string } = {
  "2 Louse": "FuzzyLouseNormal",
  "3 Louse": "FuzzyLouseNormal",
  "3 Darklings": "Darkling",
  Slavers: "SlaverBoss", // act2エリート、タスクマスター
  "Shell Parasite": "Shelled Parasite",
  "2 Fungi Beasts": "FungiBeast",
  "Blue Slaver": "SlaverBlue",
  "Orb Walker": "Orb Walker", // スペース入りなので定義しないと漏れる
  Automaton: "BronzeAutomaton",
  Collector: "TheCollector",
  "Red Slaver": "SlaverRed",
  "The Heart": "CorruptHeart",
  "Spire Growth": "Serpent",
  "The Mushroom Lair": "FungiBeast",
  "Lagavulin Event": "Lagavulin"
};

export const useMonsterName = (id: string) => {
  const l = useLocalization();
  const { monstersJson, uiJson } = l;

  const shortId = id
    .split(" ")
    .map(part => _.capitalize(part))
    .join("");

  // NOTE: Mind Bloom Boss Battle だけ名前を翻訳する仕組みがない…気がする

  if (idToAnotherId[id] !== undefined) {
    const anotherId = idToAnotherId[id];
    return monstersJson[anotherId].NAME;
  } else if (monstersJson[shortId] !== undefined) {
    return monstersJson[shortId].NAME;
  } else if (idToRunHistoryNameIndex[id] !== undefined) {
    const index = idToRunHistoryNameIndex[id];
    return uiJson.RunHistoryMonsterNames.TEXT[index];
  } else {
    return id;
  }
};

const MonsterName = (props: Prop) => {
  const { id } = props;
  const name = useMonsterName(id);
  const mt = getMonsterType(id);

  return (
    <div className="monster-name" data-monster-type={mt} data-enemies-id={id}>
      {name}
    </div>
  );
};

export default MonsterName;
