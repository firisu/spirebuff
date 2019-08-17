import React from "react";

import cards_jpn from "localization/jpn/cards.json";
import cards_eng from "localization/eng/cards.json";

export type GameLanguage = "jpn" | "eng";

export const useLocalization = () => {
  const language = React.useContext(LanguageContext);

  const jsons: any = {};
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
    cardInfo: (id: string) => {
      if (jsons.cards[id] === undefined) {
        console.error(id, "のカード情報が見つかりませんでした。");
        return { NAME: "ERROR CARD" };
      }

      return jsons.cards[id];
    }
  };
};

export const LanguageContext = React.createContext<GameLanguage>("jpn");
