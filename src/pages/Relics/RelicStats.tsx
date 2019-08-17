import React from "react";
import { Table } from "semantic-ui-react";

import { RelicTier } from "modules/relics";

interface Props {
  level: number;
  char: string;
  tiers: ReadonlyArray<RelicTier>;
}

const RelicStats = (props: Props) => {
  const { level, char, tiers } = props;

  return (
    <Table inverted sortable selectable celled size="small" compact="very">
      <Table.Header>
        <Table.Row />
      </Table.Header>
    </Table>
  );
};

export default RelicStats;
