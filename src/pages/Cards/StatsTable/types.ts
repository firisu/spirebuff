import * as _ from "lodash";

export type StatsData = Array<{
  cardname: string;
  appeared: number;
  picked: number;
}>;

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
        appeared: 0,
        picked: 0
      });
    }
  }

  appeared(cardname: string) {
    this.initCard(cardname);
    const i = _.findIndex(this.data, elm => elm.cardname === cardname);
    this.data[i].appeared++;
  }

  picked(cardname: string) {
    this.initCard(cardname);
    const i = _.findIndex(this.data, elm => elm.cardname === cardname);
    this.data[i].picked++;
  }
}
