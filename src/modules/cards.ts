import { useLocalization } from "./localization";

import cards from "data/cards.json";

// カードのフルネームを渡して短い名称とアップグレード済みかを見る
export const parseCardName = (fullname: string): [string, number] => {
  const regex = /([^+]+)(?:\+(\d+))?/;
  const match = fullname.match(regex);

  if (match) {
    const [, name, upgrade] = match;
    const upgradeNum = upgrade === undefined ? 0 : Number(upgrade);
    return [name, upgradeNum];
  } else {
    return ["Error Card", 0];
  }
};

export interface CardData {
  [id: string]: {
    type: CardType;
    color: CardColor;
    rarity: CardRarity;
    target: CardTarget;
  };
}

export type CardColor =
  | "RED"
  | "GREEN"
  | "BLUE"
  | "PURPLE"
  | "COLORLESS"
  | "CURSE";
export type CardTarget =
  | "ENEMY"
  | "ALL_ENEMY"
  | "SELF"
  | "NONE"
  | "SELF_AND_ENEMY"
  | "ALL";
export type CardRarity =
  | "BASIC"
  | "SPECIAL"
  | "COMMON"
  | "UNCOMMON"
  | "RARE"
  | "CURSE";
export type CardType = "ATTACK" | "SKILL" | "POWER" | "STATUS" | "CURSE";
export type CardTags = "HEALING" | "STRIKE";

export interface CardInfo {
  name: string;
  description: string;
  type: CardType;
  color: CardColor;
  rarity: CardRarity;
  target: CardTarget;
}

// カードの色々な情報を一気に取得できる奴
export const useCards = () => {
  const { cardL } = useLocalization();

  return {
    getCardInfo: (id: string): CardInfo => {
      const info = cardL(id);
      const data = (cards as CardData)[id];

      return {
        name: info.NAME,
        description: info.DESCRIPTION,
        type: data.type,
        color: data.color,
        rarity: data.rarity,
        target: data.target
      };
    }
  };
};
