import React from "react";
import { Table } from "semantic-ui-react";
import * as _ from "lodash";

import { RelicTier, useRelics } from "modules/relics";

import { useSortedStats } from "./utils";
import { SortString, SortDirection } from "./types";
import { formatWinrate } from "modules/utils";

interface Props {
  level: number;
  char: string;
  tiers: ReadonlyArray<RelicTier>;
}

const RelicStats = (props: Props) => {
  const { level, char, tiers } = props;

  // ソート用変数
  const [sort, setSort] = React.useState<SortString>("picked");
  const [direction, setDirection] = React.useState<SortDirection>("descending");
  const stats = useSortedStats(level, char, tiers, sort, direction);

  // ソートハンドラ
  const handleSort = (e: any) => {
    const newSort: SortString = e.target.dataset.sort;
    if (sort === newSort) {
      const newDirection =
        direction === "ascending" ? "descending" : "ascending";
      setDirection(newDirection);
    } else {
      setSort(newSort);
      setDirection("descending");
    }
  };

  // レリックの名前取得用
  const { getAllRelicInfo } = useRelics();
  const allRelics = getAllRelicInfo();

  return (
    <Table inverted sortable selectable celled size="small" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={sort === "name" ? direction : undefined}
            onClick={handleSort}
            data-sort="name"
            width={3}
          >
            レリック名
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "picked" ? direction : undefined}
            onClick={handleSort}
            data-sort="picked"
            width={2}
          >
            取得回数
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "act3won" ? direction : undefined}
            onClick={handleSort}
            data-sort="act3won"
            width={2}
          >
            勝率(act3)
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "act4won" ? direction : undefined}
            onClick={handleSort}
            data-sort="act4won"
            width={2}
          >
            勝率(act4)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(stats, (stat, id) => {
          const { picked, act3won, act4won } = stat;

          return (
            <Table.Row key={`relic-row-${id}`}>
              <Table.Cell data-sort="name">{allRelics[id].name}</Table.Cell>
              <Table.Cell data-sort="picked">{picked}</Table.Cell>
              <Table.Cell data-sort="act3won">
                {formatWinrate(picked, act3won)}
              </Table.Cell>
              <Table.Cell data-sort="act4won">
                {formatWinrate(picked, act4won)}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default RelicStats;
