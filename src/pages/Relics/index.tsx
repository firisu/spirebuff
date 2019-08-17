import React from "react";
import { Grid, Menu } from "semantic-ui-react";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import { charNameMap } from "modules/chars";

const Relics = () => {
  const [level, setLevel] = React.useState(20);
  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);

  return (
    <Grid.Column width={16}>
      <Menu inverted>
        <Menu.Item>
          <DropdownChar value={char} setFunction={setChar} />
        </Menu.Item>
        <Menu.Item>
          <DropdownLevel value={level} setFunction={setLevel} />
        </Menu.Item>
      </Menu>
    </Grid.Column>
  );
};

export default Relics;
