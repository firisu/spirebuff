import * as _ from "lodash";

export type SortString = "name" | "picked" | "act3won" | "act4won";
export type SortDirection = "ascending" | "descending" | undefined;

interface StatsData {
  [id: string]: {
    [key: string]: number;
  };
}

export class Stats {
  data: StatsData;
  keys: string[];

  constructor(...keys: string[]) {
    this.data = {};
    this.keys = keys;
  }

  initStat(id: string) {
    if (this.data[id] === undefined) {
      this.data[id] = {};
      this.keys.forEach(key => {
        this.data[id][key] = 0;
      });
    }
  }

  incr(id: string, key: string) {
    this.initStat(id);
    this.data[id][key]++;
  }
}
