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

  return {
    getRelicInfo: (id: string): RelicInfo => {
      const info = relicL(id);
      const data = (relics as RelicData)[id];

      return {
        name: info.NAME,
        flavor: info.FLAVOR,
        descriptions: info.DESCRIPTIONS,
        tier: data.tier
      };
    }
  };
};
