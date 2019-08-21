import React from "react";
import { Grid, Table } from "semantic-ui-react";

const Events = () => {
  return (
    <Grid.Column width={16}>
      <Table inverted selectable celled size="small" compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>イベント名</Table.HeaderCell>
            <Table.HeaderCell>発生回数</Table.HeaderCell>
            <Table.HeaderCell>詳細</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>名前</Table.Cell>
            <Table.Cell>111</Table.Cell>
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
                    <Table.HeaderCell>選択肢</Table.HeaderCell>
                    <Table.HeaderCell>回数</Table.HeaderCell>
                    <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
                    <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>無視する</Table.Cell>
                    <Table.Cell>123</Table.Cell>
                    <Table.Cell>11.1 %</Table.Cell>
                    <Table.Cell>9.9 %</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default Events;
