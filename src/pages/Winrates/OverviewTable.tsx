import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";

import { charNameMap } from "modules/chars";
import {
  useVictoriesByChar,
  useVictoriesByMode,
  modeNameMap
} from "modules/runs";
import { formatWinrate } from "modules/utils";

import { commonHeaders } from "./common";
import AscensionRow from "./AscensionRow";

const OverviewTable = () => {
  const now = moment()
    .utc()
    .valueOf();
  const month = 1 * 30 * 24 * 60 * 60 * 1000;
  const V_modes = {
    all: useVictoriesByMode(),
    medium: useVictoriesByMode(now - 3 * month),
    short: useVictoriesByMode(now - 1 * month)
  };
  const V_A0 = {
    all: useVictoriesByChar(0),
    medium: useVictoriesByChar(0, now - 3 * month),
    short: useVictoriesByChar(0, now - 1 * month)
  };
  const V_A20 = {
    all: useVictoriesByChar(20),
    medium: useVictoriesByChar(20, now - 3 * month),
    short: useVictoriesByChar(20, now - 1 * month)
  };

  return (
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

      {/* モード */}
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>モード</Table.HeaderCell>
          <Table.HeaderCell>プレイ数</Table.HeaderCell>
          <Table.HeaderCell>勝率</Table.HeaderCell>
          <Table.HeaderCell>-</Table.HeaderCell>
          <Table.HeaderCell>プレイ数</Table.HeaderCell>
          <Table.HeaderCell>勝率</Table.HeaderCell>
          <Table.HeaderCell>-</Table.HeaderCell>
          <Table.HeaderCell>プレイ数</Table.HeaderCell>
          <Table.HeaderCell>勝率</Table.HeaderCell>
          <Table.HeaderCell>-</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {["normal", "custom"].map(mode => {
          return (
            <Table.Row key={`mode-${mode}`}>
              <Table.Cell>{modeNameMap[mode]}</Table.Cell>
              <Table.Cell>{V_modes.all[mode].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(V_modes.all[mode].runs, V_modes.all[mode].act3)}
              </Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>{V_modes.medium[mode].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  V_modes.medium[mode].runs,
                  V_modes.medium[mode].act3
                )}
              </Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>{V_modes.short[mode].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  V_modes.short[mode].runs,
                  V_modes.short[mode].act3
                )}
              </Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      {/* アセンション0 */}
      <AscensionRow level={0} />

      {/* アセンション20 */}
      <AscensionRow level={20} />
    </Table>
  );
};

export default OverviewTable;
