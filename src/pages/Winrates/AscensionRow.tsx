import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";

import { charNameMap } from "modules/chars";
import { useVictoriesByChar } from "modules/runs";
import { formatWinrate } from "modules/utils";

import { commonHeaders } from "./common";

interface RowProps {
  level: number;
}

const AscencionRow = (props: RowProps) => {
  const { level } = props;
  const now = moment()
    .utc()
    .valueOf();
  const month = 1 * 30 * 24 * 60 * 60 * 1000;
  const victories = {
    all: useVictoriesByChar(level),
    medium: useVictoriesByChar(level, now - 3 * month),
    short: useVictoriesByChar(level, now - 1 * month)
  };

  return (
    <>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>アセンション {level}</Table.HeaderCell>
          {commonHeaders}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(charNameMap).map(char => {
          return (
            <Table.Row key={`ascension-${level}-${char}`}>
              <Table.Cell>{charNameMap[char]}</Table.Cell>
              <Table.Cell>{victories.all[char].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.all[char].runs,
                  victories.all[char].act3
                )}
              </Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.all[char].runs,
                  victories.all[char].act4
                )}
              </Table.Cell>
              <Table.Cell>{victories.medium[char].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.medium[char].runs,
                  victories.medium[char].act3
                )}
              </Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.medium[char].runs,
                  victories.medium[char].act4
                )}
              </Table.Cell>
              <Table.Cell>{victories.short[char].runs}</Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.short[char].runs,
                  victories.short[char].act3
                )}
              </Table.Cell>
              <Table.Cell>
                {formatWinrate(
                  victories.short[char].runs,
                  victories.short[char].act4
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </>
  );
};

export default AscencionRow;
