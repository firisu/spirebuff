import React from "react";
import { Grid, Table } from "semantic-ui-react";

const Winrates = () => {
  return (
    <Grid.Column width={16}>
      <Table inverted striped selectable size="small" compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell width={3} colSpan={3} textAlign="center">
              全期間
            </Table.HeaderCell>
            <Table.HeaderCell width={3} colSpan={3} textAlign="center">
              3ヶ月
            </Table.HeaderCell>
            <Table.HeaderCell width={3} colSpan={3} textAlign="center">
              1ヶ月
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>モード</Table.HeaderCell>
            <Table.HeaderCell>プレイ数</Table.HeaderCell>
            <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
            <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
            <Table.HeaderCell>プレイ数</Table.HeaderCell>
            <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
            <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
            <Table.HeaderCell>プレイ数</Table.HeaderCell>
            <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
            <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default Winrates;
