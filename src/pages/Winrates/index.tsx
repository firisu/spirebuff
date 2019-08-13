import React from "react";
import { Grid, Table } from "semantic-ui-react";
import moment from "moment";

import { charNameMap } from "modules/chars";
import { useVictoriesByChar } from "modules/runs";
import { formatWinrate } from "modules/utils";

const Winrates = () => {
  const commonHeaders = (
    <>
      <Table.HeaderCell>プレイ数</Table.HeaderCell>
      <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
      <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
      <Table.HeaderCell>プレイ数</Table.HeaderCell>
      <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
      <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
      <Table.HeaderCell>プレイ数</Table.HeaderCell>
      <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
      <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
    </>
  );

  const now = moment()
    .utc()
    .valueOf();
  const V_A0 = {
    all: useVictoriesByChar(0),
    medium: useVictoriesByChar(0, now - 3 * 30 * 24 * 60 * 60 * 1000), // 3ヶ月前
    short: useVictoriesByChar(0, now - 1 * 30 * 24 * 60 * 60 * 1000) // 1ヶ月前
  };
  const V_A20 = {
    all: useVictoriesByChar(20),
    medium: useVictoriesByChar(20, now - 3 * 30 * 24 * 60 * 60 * 1000), // 3ヶ月前
    short: useVictoriesByChar(20, now - 1 * 30 * 24 * 60 * 60 * 1000) // 1ヶ月前
  };

  return (
    <Grid.Column width={16}>
      <Table inverted selectable celled size="small" compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell width={4} colSpan={3} textAlign="center">
              全期間
            </Table.HeaderCell>
            <Table.HeaderCell width={4} colSpan={3} textAlign="center">
              3ヶ月
            </Table.HeaderCell>
            <Table.HeaderCell width={4} colSpan={3} textAlign="center">
              1ヶ月
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>モード</Table.HeaderCell>
            {commonHeaders}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>ノーマル</Table.Cell>
            <Table.Cell>500</Table.Cell>
            <Table.Cell>25.0 %</Table.Cell>
            <Table.Cell>5.0 %</Table.Cell>
            <Table.Cell>300</Table.Cell>
            <Table.Cell>25.0 %</Table.Cell>
            <Table.Cell>5.0 %</Table.Cell>
            <Table.Cell>100</Table.Cell>
            <Table.Cell>25.0 %</Table.Cell>
            <Table.Cell>5.0 %</Table.Cell>
          </Table.Row>
        </Table.Body>

        {/* アセンション0 */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ascension 0</Table.HeaderCell>
            {commonHeaders}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(charNameMap).map(char => {
            return (
              <Table.Row key={`a0-${char}`}>
                <Table.Cell>{charNameMap[char]}</Table.Cell>
                <Table.Cell>{V_A0.all[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A0.all[char].runs, V_A0.all[char].act3)}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A0.all[char].runs, V_A0.all[char].act4)}
                </Table.Cell>
                <Table.Cell>{V_A0.medium[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A0.medium[char].runs,
                    V_A0.medium[char].act3
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A0.medium[char].runs,
                    V_A0.medium[char].act4
                  )}
                </Table.Cell>
                <Table.Cell>{V_A0.short[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A0.short[char].runs, V_A0.short[char].act3)}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A0.short[char].runs, V_A0.short[char].act4)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        {/* アセンション20 */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ascension 20</Table.HeaderCell>
            {commonHeaders}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(charNameMap).map(char => {
            return (
              <Table.Row key={`a20-${char}`}>
                <Table.Cell>{charNameMap[char]}</Table.Cell>
                <Table.Cell>{V_A20.all[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A20.all[char].runs, V_A20.all[char].act3)}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(V_A20.all[char].runs, V_A20.all[char].act4)}
                </Table.Cell>
                <Table.Cell>{V_A20.medium[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A20.medium[char].runs,
                    V_A20.medium[char].act3
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A20.medium[char].runs,
                    V_A20.medium[char].act4
                  )}
                </Table.Cell>
                <Table.Cell>{V_A20.short[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A20.short[char].runs,
                    V_A20.short[char].act3
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    V_A20.short[char].runs,
                    V_A20.short[char].act4
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default Winrates;
