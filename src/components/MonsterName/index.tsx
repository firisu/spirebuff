import React from "react";
import * as _ from "lodash";

import { useLocalization } from "modules/localization";

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
  "CITY MUGGERS": 6, // TBD
  "3 Byrds": 7,
  "4 Byrds": 8,
  "3 Cultists": 9,
  "Lots of Chosens": 10, // TBD
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

export const useMonsterName = (id: string) => {
  const l = useLocalization();
  const { monstersJson, uiJson } = l;

  const shortId = id
    .split(" ")
    .map(part => _.capitalize(part))
    .join("");

  if (monstersJson[shortId] !== undefined) {
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

  return <div>{name}</div>;
};

export default MonsterName;
