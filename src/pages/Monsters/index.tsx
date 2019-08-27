import React from "react";
import { Grid, Table, Menu } from "semantic-ui-react";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import MonsterName from "components/MonsterName";
import { charNameMap } from "modules/chars";
import { formatWinrate } from "modules/utils";

import { useSortedStats } from "./utils";
import { SortString, SortDirection } from "./types";

const Monsters = () => {
  const [level, setLevel] = React.useState(20);
  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);

  // ソート用変数
  const [sort, setSort] = React.useState<SortString>("count");
  const [direction, setDirection] = React.useState<SortDirection>("descending");

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

  // スタッツ取得
  const stats = useSortedStats(level, char, sort, direction);

  return (
    <Grid.Column width={16}>
      <Menu inverted>
        <Menu.Item>
          <DropdownChar value={char} setFunction={setChar} />
        </Menu.Item>
        <Menu.Item>
          <DropdownLevel value={level} setFunction={setLevel} />
        </Menu.Item>
      </Menu>

      <Table inverted sortable selectable celled size="small" compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>モンスター</Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              onClick={handleSort}
              data-sort="count"
              sorted={sort === "count" ? direction : undefined}
            >
              遭遇回数
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              onClick={handleSort}
              data-sort="damage"
              sorted={sort === "damage" ? direction : undefined}
            >
              ダメージ
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              onClick={handleSort}
              data-sort="turns"
              sorted={sort === "turns" ? direction : undefined}
            >
              ターン
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              onClick={handleSort}
              data-sort="death"
              sorted={sort === "death" ? direction : undefined}
            >
              死亡率
            </Table.HeaderCell>
            <Table.HeaderCell>備考</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(stats).map(key => (
            <Table.Row key={`monster-stats-${key}`}>
              <Table.Cell>
                <MonsterName id={stats[key].name} />
              </Table.Cell>
              <Table.Cell>{stats[key].count}</Table.Cell>
              <Table.Cell>
                {Math.floor(stats[key].damage / stats[key].count)}
              </Table.Cell>
              <Table.Cell>
                {(stats[key].turns / stats[key].count).toFixed(1)}
              </Table.Cell>
              <Table.Cell>
                {formatWinrate(stats[key].count, stats[key].death)}
              </Table.Cell>
              <Table.Cell />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default Monsters;
