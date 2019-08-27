import ironclad from "components/Avatar/ironclad.png";
import silent from "components/Avatar/silent.png";
import defect from "components/Avatar/defect.png";

export const characterNames = ["IRONCLAD", "THE_SILENT", "DEFECT"] as const;
export type CharacterName = typeof characterNames[number];

export const characterColors = ["RED", "GREEN", "BLUE"] as const;
export type CharacterColor = typeof characterColors[number];

export const colorCharMap: { [C in CharacterColor]?: CharacterName } = {
  RED: "IRONCLAD",
  GREEN: "THE_SILENT",
  BLUE: "DEFECT"
};

export const charColorMap: { [char: string]: string } = {
  IRONCLAD: "RED",
  THE_SILENT: "GREEN",
  DEFECT: "BLUE"
};

export const charNameMap: { [char: string]: string } = {
  IRONCLAD: "アイアンクラッド",
  THE_SILENT: "サイレント",
  DEFECT: "ディフェクト"
};

export const getCharName = (char: string): string => {
  return charNameMap[char];
};

export const charImageMap: { [char: string]: string } = {
  IRONCLAD: ironclad,
  THE_SILENT: silent,
  DEFECT: defect
};
