import React from "react";
import { Grid, Table, Menu, Tab } from "semantic-ui-react";

import OverviewTable from "./OverviewTable";
import "./style.scss";

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
      render: () => <Tab.Pane attached={false}>TBD</Tab.Pane>
    },
    {
      menuItem: "キャラクター",
      render: () => <Tab.Pane attached={false}>TBD</Tab.Pane>
    }
  ];

  return (
    <Grid.Column width={16}>
      <Tab
        menu={{ inverted: true, secondary: true, pointing: true }}
        panes={panes}
        className="winrates-tab"
      />
    </Grid.Column>
  );
};

export default Winrates;
