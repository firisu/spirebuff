import React from "react";
import { Table } from "semantic-ui-react";
import * as _ from "lodash";

import CardName from "components/CardName";
import { useCards } from "modules/cards";
import { charColorMap } from "modules/chars";
import { formatWinrate } from "modules/utils";

import { useStats } from "./utils";

type SortString = "cardname" | "appeared" | "picked" | "pickrate";
type SortDirection = "ascending" | "descending" | undefined;

const useSortedStats = (
  level: number,
  char: string,
  sort: SortString,
  direction: SortDirection
) => {
  const { getCardInfo } = useCards();

  const sourceStats = useStats(level, char);

  let sortedStats;
  if (sort === "cardname") {
    sortedStats = _.sortBy(sourceStats, elm => getCardInfo(elm.cardname).name);
  } else if (sort === "pickrate") {
    sortedStats = _.sortBy(sourceStats, elm => elm.picked / elm.appeared);
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
  hideOtherColor: boolean;
}

const StatsTable = (props: Props) => {
  const { level, char, hideOtherColor } = props;

  const [sort, setSort] = React.useState<SortString>("appeared");
  const [direction, setDirection] = React.useState<SortDirection>("descending");
  const stats = useSortedStats(level, char, sort, direction);

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

  // 色判定用
  const { getCardInfo } = useCards();
  const myColor = charColorMap[char];

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
            sorted={sort === "appeared" ? direction : undefined}
            onClick={handleSort}
            data-sort="appeared"
            width={2}
          >
            出現回数
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "picked" ? direction : undefined}
            onClick={handleSort}
            data-sort="picked"
            width={2}
          >
            ピック回数
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={sort === "pickrate" ? direction : undefined}
            onClick={handleSort}
            data-sort="pickrate"
            width={2}
          >
            ピック率
          </Table.HeaderCell>
          <Table.HeaderCell>備考</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map(elm => {
          const { cardname, appeared, picked } = elm;
          if (hideOtherColor && getCardInfo(elm.cardname).color !== myColor) {
            return null;
          }

          return (
            <Table.Row key={`card-row-${cardname}`}>
              <Table.Cell data-sort="cardname">
                <CardName id={cardname} />
              </Table.Cell>
              <Table.Cell data-sort="appeared">{appeared}</Table.Cell>
              <Table.Cell data-sort="picked">{picked}</Table.Cell>
              <Table.Cell data-sort="picked">
                {formatWinrate(appeared, picked)}
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
