import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const AppMenu = () => {
  return (
    <Menu pointing secondary inverted>
      <Menu.Item as={Link} to="/">
        トップ
      </Menu.Item>
      <Menu.Item as={Link} to="/winrates">
        勝率
      </Menu.Item>
      <Menu.Item as={Link} to="/cards">
        カード
      </Menu.Item>
      <Menu.Item as={Link} to="/relics">
        レリック
      </Menu.Item>
      <Menu.Item as={Link} to="/events">
        イベント
      </Menu.Item>
      <Menu.Item as={Link} to="/monsters">
        モンスター
      </Menu.Item>
      <Menu.Item as={Link} to="/records">
        記録
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
