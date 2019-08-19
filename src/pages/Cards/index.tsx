import React from "react";
import { Grid, Menu, Tab, Checkbox } from "semantic-ui-react";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import { charNameMap } from "modules/chars";
import PickStats from "./PickStats";
import WinrateStats from "./WinrateStats";

const Cards = () => {
  const [level, setLevel] = React.useState(20);
  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);

  const [hideLow, setHideLow] = React.useState(true);
  const toggleHideLow = () => {
    setHideLow(!hideLow);
  };
  const [hideStarter, setHideStarter] = React.useState(true);
  const toggleHideStarter = () => {
    setHideStarter(!hideStarter);
  };

  const panes = [
    {
      menuItem: "ピック",
      render: () => (
        <Tab.Pane attached={false}>
          <PickStats
            level={level}
            char={char}
            hideLow={hideLow}
            hideStarter={hideStarter}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "勝率",
      render: () => (
        <Tab.Pane attached={false}>
          <WinrateStats
            level={level}
            char={char}
            hideLow={hideLow}
            hideStarter={hideStarter}
          />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Grid.Column width={16}>
      <Menu inverted>
        <Menu.Item>
          <DropdownChar value={char} setFunction={setChar} />
        </Menu.Item>
        <Menu.Item>
          <DropdownLevel value={level} setFunction={setLevel} />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="低頻度のカードを隠す"
            onClick={toggleHideLow}
            defaultChecked={hideLow}
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="スターターを隠す"
            onClick={toggleHideStarter}
            defaultChecked={hideStarter}
          />
        </Menu.Item>
      </Menu>

      <Tab
        menu={{ inverted: true, secondary: true, pointing: true }}
        panes={panes}
      />
    </Grid.Column>
  );
};

export default Cards;
