import React from "react";
import { Grid, Menu, Dropdown, DropdownProps } from "semantic-ui-react";
import * as _ from "lodash";

import DropdownChar from "components/DropdownChar";
import DropdownLevel from "components/DropdownLevel";
import { charNameMap } from "modules/chars";
import {
  RelicTier,
  RelicTierNormal,
  RelicTierBoss,
  RelicTierSpecial,
  RelicTierShop
} from "modules/relics";

import RelicStats from "./RelicStats";

export type TierGroup = "normal" | "boss" | "special" | "shop";

const tierGroupMap: { [key in TierGroup]: ReadonlyArray<RelicTier> } = {
  normal: RelicTierNormal,
  boss: RelicTierBoss,
  special: RelicTierSpecial,
  shop: RelicTierShop
};
const tierGroupOptions = _.map(tierGroupMap, (v, k) => ({
  key: `tierGroup-${k}`,
  text: k,
  value: k
}));

const Relics = () => {
  const [level, setLevel] = React.useState(20);
  const [char, setChar] = React.useState<string>(Object.keys(charNameMap)[0]);
  const [tierGroup, setTierGroup] = React.useState<TierGroup>("normal");
  const changeHandler = (_: any, data: DropdownProps) => {
    setTierGroup(data.value as TierGroup);
  };

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
          <Dropdown
            scrolling
            options={tierGroupOptions}
            defaultValue={tierGroup}
            onChange={changeHandler}
          />
        </Menu.Item>
      </Menu>

      <RelicStats level={level} char={char} tiers={tierGroupMap[tierGroup]} />
    </Grid.Column>
  );
};

export default Relics;
