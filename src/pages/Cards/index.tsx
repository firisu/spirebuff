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

  const [hideOtherColor, setHideOtherColor] = React.useState(true);
  const toggleHideOtherColor = () => {
    setHideOtherColor(!hideOtherColor);
  };

  const panes = [
    {
      menuItem: "ピック",
      render: () => (
        <Tab.Pane attached={false}>
          <PickStats
            level={level}
            char={char}
            hideOtherColor={hideOtherColor}
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
            hideOtherColor={hideOtherColor}
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
            label="他色のカードを隠す"
            onClick={toggleHideOtherColor}
            defaultChecked={hideOtherColor}
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
