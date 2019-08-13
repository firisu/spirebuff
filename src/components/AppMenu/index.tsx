import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import useReactRouter from "use-react-router";

const AppMenu = () => {
  const { location } = useReactRouter();
  const { pathname } = location;

  const items = [
    { to: "/", name: "トップ" },
    { to: "/winrates", name: "勝率" },
    { to: "/cards", name: "カード" },
    { to: "/relics", name: "レリック" },
    { to: "/events", name: "イベント" },
    { to: "/monsters", name: "モンスター" },
    { to: "/records", name: "記録" }
  ];

  return (
    <Menu inverted>
      {items.map(item => (
        <Menu.Item as={Link} to={item.to} active={pathname === item.to}>
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default AppMenu;
