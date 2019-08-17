import React from "react";
import {
  Grid,
  Menu,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Tab
} from "semantic-ui-react";

import { charNameMap, charImageMap } from "modules/chars";
import PickStats from "./PickStats";
import WinrateStats from "./WinrateStats";

// レベル選択
const levelOptions: DropdownItemProps[] = [];
for (let i = 0; i <= 20; i++) {
  levelOptions.push({
    key: `level-${i}`,
    text: `アセンション ${i}`,
    value: i
  });
}

// キャラ選択
const charOptions: DropdownItemProps[] = [];
Object.keys(charNameMap).forEach(char => {
  const name = charNameMap[char];
  charOptions.push({
    key: `char-${char}`,
    text: name,
    value: char,
    image: charImageMap[char]
  });
});

const Cards = () => {
  const [level, setLevel] = React.useState(20);
  const changeLevel = (_: any, data: DropdownProps) => {
    setLevel(Number(data.value));
  };

  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);
  const changeChar = (_: any, data: DropdownProps) => {
    const value = data.value as string;
    setChar(value);
  };

  const panes = [
    {
      menuItem: "ピック",
      render: () => (
        <Tab.Pane attached={false}>
          <PickStats level={level} char={char} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "勝率",
      render: () => (
        <Tab.Pane attached={false}>
          <WinrateStats level={level} char={char} />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Grid.Column width={16}>
      <Menu inverted>
        <Menu.Item>
          <Dropdown
            options={charOptions}
            defaultValue={char}
            onChange={changeChar}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            scrolling
            options={levelOptions}
            defaultValue={level}
            onChange={changeLevel}
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
