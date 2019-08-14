import React from "react";
import { Header, Table, Icon, Popup } from "semantic-ui-react";

import {
  modeNameMap,
  useRunCountsByMode,
  useVictoriesByChar
} from "../../modules/runs";
import { charNameMap } from "../../modules/chars";
import { formatWinrate } from "../../modules/utils";

import "./style.scss";

const TopSidebar = () => {
  // デイリー: そもそもファイルを読み込んでないので不要
  // デモ: 読み込む必要なし
  const modes = ["normal", "custom"];
  const runCountsByMode = useRunCountsByMode();

  const victories_A0 = useVictoriesByChar(0);
  const victories_A20 = useVictoriesByChar(20);

  return (
    <div className="topsidebar">
      <Header inverted size="small">
        全体
      </Header>
      <Table inverted selectable compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>モード</Table.HeaderCell>
            <Table.HeaderCell>総プレイ</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {modes.map(mode => (
            <Table.Row key={`${mode}-runcount`}>
              <Table.Cell>{modeNameMap[mode]}</Table.Cell>
              <Table.Cell>{runCountsByMode[mode] || "0"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Header inverted size="small">
        アセンション 0{"　"}
        <Popup
          content="ノーマルかつシード未使用のデータだけを集計"
          trigger={<Icon name="info circle" size="mini" />}
          size="tiny"
        />
      </Header>
      <Table inverted selectable compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>キャラ</Table.HeaderCell>
            <Table.HeaderCell>総プレイ</Table.HeaderCell>
            <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
            <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(charNameMap).map(char => {
            return (
              <Table.Row key={`${char}-victory`}>
                <Table.Cell>{charNameMap[char]}</Table.Cell>
                <Table.Cell>{victories_A0[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    victories_A0[char].runs,
                    victories_A0[char].act3
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    victories_A0[char].runs,
                    victories_A0[char].act4
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Header inverted size="small">
        アセンション 20{"　"}
        <Popup
          content="ノーマルかつシード未使用のデータだけを集計"
          trigger={<Icon name="info circle" size="mini" />}
          size="tiny"
        />
      </Header>
      <Table inverted selectable compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>キャラ</Table.HeaderCell>
            <Table.HeaderCell>総プレイ</Table.HeaderCell>
            <Table.HeaderCell>勝率(act3)</Table.HeaderCell>
            <Table.HeaderCell>勝率(act4)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(charNameMap).map(char => {
            return (
              <Table.Row key={`${char}-victory`}>
                <Table.Cell>{charNameMap[char]}</Table.Cell>
                <Table.Cell>{victories_A20[char].runs}</Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    victories_A20[char].runs,
                    victories_A20[char].act3
                  )}
                </Table.Cell>
                <Table.Cell>
                  {formatWinrate(
                    victories_A20[char].runs,
                    victories_A20[char].act4
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TopSidebar;
