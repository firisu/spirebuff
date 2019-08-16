import ironclad from "components/Avatar/ironclad.png";
import silent from "components/Avatar/silent.png";
import defect from "components/Avatar/defect.png";

export const colorCharMap = {
  red: "IRONCLAD",
  green: "THE_SILENT",
  blue: "DEFECT"
};

export const charColorMap: { [char: string]: string } = {
  IRONCLAD: "red",
  THE_SILENT: "green",
  DEFECT: "blue"
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
