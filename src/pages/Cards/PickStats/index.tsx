import React from "react";
import { Table } from "semantic-ui-react";
import * as _ from "lodash";

import { useLocalization } from "modules/localization";
import { useStats } from "./utils";

type SortString = "cardname" | "appeared" | "picked" | "";
type SortDirection = "ascending" | "descending" | undefined;

const useSortedStats = (
  level: number,
  char: string,
  sort: SortString,
  direction: SortDirection
) => {
  const sourceStats = useStats(level, char);
  if (sort === "") {
    return sourceStats;
  }

  let sortedStats = _.sortBy(sourceStats, elm => elm[sort]);

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

  const { cardInfo } = useLocalization();

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
          <Table.HeaderCell>備考</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map(elm => {
          const { cardname, appeared, picked } = elm;

          return (
            <Table.Row key={`card-row-${cardname}`}>
              <Table.Cell data-sort="cardname">
                {cardInfo(cardname).NAME}
              </Table.Cell>
              <Table.Cell data-sort="appeared">{appeared}</Table.Cell>
              <Table.Cell data-sort="picked">{picked}</Table.Cell>
              <Table.Cell />
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default StatsTable;
