import * as _ from "lodash";

interface SingleStat {
  cardname: string;
  count: number;
  defeated: number;
  act3won: number;
  act4won: number;
}

export type StatsData = Array<SingleStat>;

type StatKey = keyof SingleStat;

export class Stats {
  data: StatsData;

  constructor() {
    this.data = [];
  }

  initCard(cardname: string) {
    const i = _.findIndex(this.data, elm => elm.cardname === cardname);
    if (i === -1) {
      this.data.push({
        cardname,
        count: 0,
        defeated: 0,
        act3won: 0,
        act4won: 0
      });
    }
  }

  incr(key: StatKey, cardname: string) {
    this.initCard(cardname);
    const i = _.findIndex(this.data, elm => elm.cardname === cardname);
    this.data[i][key]++;
  }
}
