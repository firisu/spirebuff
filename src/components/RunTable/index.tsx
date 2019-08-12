import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/ja";

import { Run, getModeName } from "../../modules/runs";
import { getCharName } from "../../modules/chars";
import Avatar from "../Avatar";

interface Props {
  runs: ReadonlyArray<Run>;
}

const RunTable = (props: Props) => {
  const { runs } = props;

  const getDurationString = (playtime: number): string => {
    const d = moment.duration(playtime, "seconds");
    let string = "";
    if (d.hours() > 0) {
      string += d.hours() + "h";
    }
    if (d.minutes() > 0) {
      string += d.minutes() + "m";
    }
    if (d.seconds() > 0) {
      string += d.seconds() + "s";
    }
    return string;
  };

  return (
    <Table inverted striped selectable size="small" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>キャラクター</Table.HeaderCell>
          <Table.HeaderCell>日時</Table.HeaderCell>
          <Table.HeaderCell>結果</Table.HeaderCell>
          <Table.HeaderCell>フロア</Table.HeaderCell>
          <Table.HeaderCell>モード</Table.HeaderCell>
          <Table.HeaderCell>時間</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {runs.map(run => {
          return (
            <Table.Row key={`runs-${run.timestamp}`} verticalAlign="middle">
              <Table.Cell>
                <Avatar char={run.character_chosen} />
                <span>{getCharName(run.character_chosen)}</span>
              </Table.Cell>
              <Table.Cell>{moment(run.timestamp * 1000).fromNow()}</Table.Cell>
              <Table.Cell>
                {run.victory ? (
                  <span className="victory">勝利</span>
                ) : (
                  <span className="defeat">敗北</span>
                )}
              </Table.Cell>
              <Table.Cell>{run.floor_reached}階</Table.Cell>
              <Table.Cell>{getModeName(run)}</Table.Cell>
              <Table.Cell>{getDurationString(run.playtime)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default RunTable;
