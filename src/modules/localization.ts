import React from "react";

import cards_jpn from "localization/jpn/cards.json";
import cards_eng from "localization/eng/cards.json";
import relics_jpn from "localization/jpn/relics.json";
import relics_eng from "localization/eng/relics.json";
import events_jpn from "localization/jpn/events.json";
import events_eng from "localization/eng/events.json";
import monsters_jpn from "localization/jpn/monsters.json";
import monsters_eng from "localization/eng/monsters.json";
import ui_jpn from "localization/jpn/ui.json";
import ui_eng from "localization/eng/ui.json";

export interface CardLocalization {
  NAME: string;
  DESCRIPTION: string;
}

export interface CardsJson {
  [id: string]: CardLocalization;
}

export interface RelicLocalization {
  NAME: string;
  FLAVOR: string;
  DESCRIPTIONS: ReadonlyArray<string>;
}

export interface RelicsJson {
  [id: string]: RelicLocalization;
}

export interface EventLocalization {
  NAME?: string;
  DESCRIPTIONS?: ReadonlyArray<string>;
  OPTIONS?: ReadonlyArray<string>;
}

export interface EventsJson {
  [id: string]: EventLocalization;
}

export interface MonstersJson {
  [id: string]: {
    MOVES: ReadonlyArray<string>;
    NAME: string;
    DIALOG?: ReadonlyArray<string>;
  };
}

export interface UiJson {
  RunHistoryMonsterNames: {
    TEXT: ReadonlyArray<string>;
  };
}

export type GameLanguage = "jpn" | "eng";

export const useLocalization = () => {
  const language = React.useContext(LanguageContext);

  const jsons: {
    cards: CardsJson;
    relics: RelicsJson;
    events: EventsJson;
    monsters: MonstersJson;
    ui: UiJson;
  } = {
    cards: {},
    relics: {},
    events: {},
    monsters: {},
    ui: { RunHistoryMonsterNames: { TEXT: [] } }
  };
  switch (language) {
    case "jpn": {
      jsons.cards = cards_jpn;
      jsons.relics = relics_jpn;
      jsons.events = events_jpn;
      jsons.monsters = monsters_jpn;
      jsons.ui = ui_jpn;
      break;
    }
    case "eng": {
      jsons.cards = cards_eng;
      jsons.relics = relics_eng;
      jsons.events = events_eng;
      jsons.monsters = monsters_eng;
      jsons.ui = ui_eng;
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
    },
    eventL: (id: string): EventLocalization => {
      if (jsons.events[id] === undefined) {
        throw new Error(`${id} のイベント情報が見つかりませんでした。`);
      }
      return jsons.events[id];
    },
    monstersJson: jsons.monsters,
    uiJson: jsons.ui
  };
};

export const LanguageContext = React.createContext<GameLanguage>("jpn");
