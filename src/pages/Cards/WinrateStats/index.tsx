import React from "react";
import { Table } from "semantic-ui-react";
import * as _ from "lodash";

import { useCards } from "modules/cards";
import { formatWinrate } from "modules/utils";

import { useStats } from "./utils";

type SortString =
  | "cardname"
  | "master_deck"
  | "avg_count"
  | "act3won"
  | "act4won"
  | "";
type SortDirection = "ascending" | "descending" | undefined;

const useSortedStats = (
  level: number,
  char: string,
  sort: SortString,
  direction: SortDirection
) => {
  const { getCardInfo } = useCards();

  const sourceStats = useStats(level, char);
  if (sort === "") {
    return sourceStats;
  }

  let sortedStats;
  if (sort === "cardname") {
    sortedStats = _.sortBy(sourceStats, elm => getCardInfo(elm.cardname).name);
  } else if (sort === "master_deck") {
    sortedStats = _.sortBy(sourceStats, elm => elm.defeated + elm.act3won);
  } else if (sort === "avg_count") {
    sortedStats = _.sortBy(
      sourceStats,
      elm => elm.count / (elm.defeated + elm.act3won)
    );
  } else if (sort === "act3won") {
    sortedStats = _.sortBy(sourceStats, elm =>
      elm.act3won === 0 ? 0 : elm.act3won / (elm.defeated + elm.act3won)
    );
  } else if (sort === "act4won") {
    sortedStats = _.sortBy(sourceStats, elm =>
      elm.act3won === 0 ? 0 : elm.act4won / (elm.defeated + elm.act3won)
    );
  } else {
    sortedStats = _.sortBy(sourceStats, elm => elm[sort]);
  }

  // 降順
  if (direction === "descending") {
    sortedStats = sortedStats.reverse();
  }
  return sortedStats;
};

interface Props {
  level: number;
  char: string;
}

const StatsTable = (props: Props) => {
  const { getCardInfo } = useCards();

  const { level, char } = props;

  const [sort, setSort] = React.useState<SortString>("cardname");
  const [direction, setDirection] = React.useState<SortDirection>("ascending");
  const stats = useSortedStats(level, char, sort, direction);

  const handleSort = (e: any) => {
    const newSort: SortString = e.target.dataset.sort;
    if (sort === "") {
      setSort(newSort);
    } else if (sort === newSort) {
      const newDirection =
        direction === "ascending" ? "descending" : "ascending";
      setDirection(newDirection);
    } else {
      setSort(newSort);
      setDirection("ascending");
    }
  };

  return (
    <Table inverted sortable selectable celled size="small" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={sort === "cardname" ? direction : undefined}
            onClick={handleSort}
            data-sort="cardname"
            width={3}
          >
            カード名
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "master_deck" ? direction : undefined}
            onClick={handleSort}
            data-sort="master_deck"
            width={2}
          >
            最終デッキ採用
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "avg_count" ? direction : undefined}
            onClick={handleSort}
            data-sort="avg_count"
            width={2}
          >
            平均枚数
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
          <Table.HeaderCell>備考</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map(elm => {
          const { cardname, count, defeated, act3won, act4won } = elm;

          return (
            <Table.Row key={`card-row-${cardname}`}>
              <Table.Cell data-sort="cardname" className="card-text">
                {getCardInfo(cardname).name}
              </Table.Cell>
              <Table.Cell data-sort="master_deck">
                {defeated + act3won}
              </Table.Cell>
              <Table.Cell data-sort="master_deck">
                {(count / (defeated + act3won)).toFixed(2)}
              </Table.Cell>
              <Table.Cell data-sort="act3">
                {formatWinrate(defeated + act3won, act3won)}
              </Table.Cell>
              <Table.Cell data-sort="act4">
                {formatWinrate(defeated + act3won, act4won)}
              </Table.Cell>
              <Table.Cell />
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StatsTable;
