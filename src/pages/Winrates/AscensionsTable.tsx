import React from "react";
import { Table } from "semantic-ui-react";

import AscensionRow from "./AscensionRow";

const AscensionsTable = () => {
  const levels = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];

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

      {levels.map(level => (
        <AscensionRow level={level} key={`ascension-row-${level}`} />
      ))}
    </Table>
  );
};

export default AscensionsTable;
