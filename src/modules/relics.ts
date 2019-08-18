import * as _ from "lodash";

import { useLocalization } from "./localization";

import relics from "data/relics.json";

export type RelicTier =
  | "DEPRECATED"
  | "STARTER"
  | "COMMON"
  | "UNCOMMON"
  | "RARE"
  | "SPECIAL"
  | "BOSS"
  | "SHOP";

export const RelicTierNormal: ReadonlyArray<RelicTier> = [
  "COMMON",
  "UNCOMMON",
  "RARE"
];
export const RelicTierBoss: ReadonlyArray<RelicTier> = ["BOSS"];
export const RelicTierSpecial: ReadonlyArray<RelicTier> = ["SPECIAL"];
export const RelicTierShop: ReadonlyArray<RelicTier> = ["SHOP"];

export interface RelicData {
  [id: string]: {
    tier: RelicTier;
  };
}

export interface RelicInfo {
  name: string;
  flavor: string;
  descriptions: ReadonlyArray<string>;
  tier: RelicTier;
}

// レリックの情報をまとめて取得
export const useRelics = () => {
  const { relicL } = useLocalization();

  const relicInfo: { [id: string]: RelicInfo } = {};
  _.map(relics as RelicData, (data, id) => {
    const info = relicL(id);
    relicInfo[id] = {
      name: info.NAME,
      flavor: info.FLAVOR,
      descriptions: info.DESCRIPTIONS,
      ...data
    };
  });

  return {
    getRelicInfo: (id: string): RelicInfo => {
      return relicInfo[id];
    },
    getAllRelicInfo: (): { [id: string]: RelicInfo } => {
      return relicInfo;
    }
  };
};
