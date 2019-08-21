import React from "react";
import { Grid, Table, Menu } from "semantic-ui-react";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import { charNameMap } from "modules/chars";

import { useStats } from "./utils";
import { formatWinrate } from "modules/utils";

const Events = () => {
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
            <Table.HeaderCell width={3}>イベント名</Table.HeaderCell>
            <Table.HeaderCell width={1}>発生回数</Table.HeaderCell>
            <Table.HeaderCell>詳細</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(stats).map(key => (
            <Table.Row key={`event-stats-${key}`}>
              <Table.Cell>{stats[key].name}</Table.Cell>
              <Table.Cell>{stats[key].count}</Table.Cell>
              <Table.Cell>
                <Table
                  inverted
                  selectable
                  celled
                  size="small"
                  compact="very"
                  attached
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={4}>選択肢</Table.HeaderCell>
                      <Table.HeaderCell width={2}>回数</Table.HeaderCell>
                      <Table.HeaderCell width={2}>勝率(act3)</Table.HeaderCell>
                      <Table.HeaderCell width={2}>勝率(act4)</Table.HeaderCell>
                      <Table.HeaderCell>備考</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.keys(stats[key].choices).map(choiceKey => {
                      const choice = stats[key].choices[choiceKey];
                      return (
                        <Table.Row key={`${key}-choice-${choiceKey}`}>
                          <Table.Cell>{choiceKey}</Table.Cell>
                          <Table.Cell>{choice.count}</Table.Cell>
                          <Table.Cell>
                            {formatWinrate(choice.count, choice.act3won)}
                          </Table.Cell>
                          <Table.Cell>
                            {formatWinrate(choice.count, choice.act4won)}
                          </Table.Cell>
                          <Table.Cell />
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default Events;
