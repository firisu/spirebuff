import React from "react";

import cards_jpn from "localization/jpn/cards.json";
import cards_eng from "localization/eng/cards.json";
import relics_jpn from "localization/jpn/relics.json";
import relics_eng from "localization/eng/relics.json";

export interface CardLocalization {
  NAME: string;
  DESCRIPTION: string;
}

export interface RelicLocalization {
  NAME: string;
  FLAVOR: string;
  DESCRIPTIONS: ReadonlyArray<string>;
}

export interface CardsJson {
  [id: string]: CardLocalization;
}

export interface RelicsJson {
  [id: string]: RelicLocalization;
}

export type GameLanguage = "jpn" | "eng";

export const useLocalization = () => {
  const language = React.useContext(LanguageContext);

  const jsons: { cards: CardsJson; relics: RelicsJson } = {
    cards: {},
    relics: {}
  };
  switch (language) {
    case "jpn": {
      jsons.cards = cards_jpn;
      jsons.relics = relics_jpn;
      break;
    }
    case "eng": {
      jsons.cards = cards_eng;
      jsons.relics = relics_eng;
      break;
    }
  }

  return {
    cardL: (id: string): CardLocalization => {
      if (jsons.cards[id] === undefined) {
        throw new Error(`${id} のカード情報が見つかりませんでした。`);
      }
      return jsons.cards[id];
    },
    relicL: (id: string): RelicLocalization => {
      if (jsons.relics[id] === undefined) {
        throw new Error(`${id} のレリック情報が見つかりませんでした。`);
      }
      return jsons.relics[id];
    }
  };
};

export const LanguageContext = React.createContext<GameLanguage>("jpn");
