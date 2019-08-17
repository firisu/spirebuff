import React from "react";

import cards_jpn from "localization/jpn/cards.json";
import cards_eng from "localization/eng/cards.json";

export interface CardLocalization {
  NAME: string;
  DESCRIPTION: string;
}

export interface CardsJson {
  [id: string]: CardLocalization;
}

export type GameLanguage = "jpn" | "eng";

export const useLocalization = () => {
  const language = React.useContext(LanguageContext);

  const jsons: { cards: CardsJson } = { cards: {} };
  switch (language) {
    case "jpn": {
      jsons.cards = cards_jpn;
      break;
    }
    case "eng": {
      jsons.cards = cards_eng;
      break;
    }
  }

  return {
    cardL: (id: string): CardLocalization => {
      if (jsons.cards[id] === undefined) {
        console.error(id, "のカード情報が見つかりませんでした。");
        return { NAME: "ERROR CARD", DESCRIPTION: "ERROR CARD" };
      }

      return jsons.cards[id];
    }
  };
};

export const LanguageContext = React.createContext<GameLanguage>("jpn");
