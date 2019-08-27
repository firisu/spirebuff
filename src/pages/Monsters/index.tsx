import React from "react";
import { Grid, Table, Menu } from "semantic-ui-react";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import { charNameMap } from "modules/chars";
import { formatWinrate } from "modules/utils";

import { useStats } from "./utils";

const Monsters = () => {
  const [level, setLevel] = React.useState(20);
  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);

  const stats = useStats(level, char);

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

      <Table inverted selectable celled size="small" compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>モンスター</Table.HeaderCell>
            <Table.HeaderCell width={1}>遭遇回数</Table.HeaderCell>
            <Table.HeaderCell width={1}>ダメージ</Table.HeaderCell>
            <Table.HeaderCell width={1}>ターン</Table.HeaderCell>
            <Table.HeaderCell width={1}>死亡率</Table.HeaderCell>
            <Table.HeaderCell>備考</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(stats).map(key => (
            <Table.Row key={`monster-stats-${key}`}>
              <Table.Cell>{stats[key].name}</Table.Cell>
              <Table.Cell>{stats[key].count}</Table.Cell>
              <Table.Cell>
                {Math.floor(stats[key].damage / stats[key].count)}
              </Table.Cell>
              <Table.Cell>
                {Math.floor(stats[key].turns / stats[key].count)}
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
