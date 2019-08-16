import React from "react";
import { Grid, Tab } from "semantic-ui-react";

import OverviewTable from "./OverviewTable";
import AscensionsTable from "./AscensionsTable";

const Winrates = () => {
  const panes = [
    {
      menuItem: "全体",
      render: () => (
        <Tab.Pane attached={false}>
          <OverviewTable />
        </Tab.Pane>
      )
    },
    {
      menuItem: "アセンション",
      render: () => (
        <Tab.Pane attached={false}>
          <AscensionsTable />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Grid.Column width={16}>
      <Tab
        menu={{ inverted: true, secondary: true, pointing: true }}
        panes={panes}
      />
    </Grid.Column>
  );
};

export default Winrates;
