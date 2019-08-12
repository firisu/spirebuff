import React from "react";
import { List } from "semantic-ui-react";

import "./style.scss";

const UserOverview = () => {
  return (
    <List className="useroverview" inverted divided horizontal size="small">
      <List.Item>
        <div>
          <span className="red">500</span>/<span className="green">400</span>/
          <span className="blue">300</span>
        </div>
        <div>プレイ回数</div>
      </List.Item>
      <List.Item>
        <div>20/20/20</div>
        <div>アセンション</div>
      </List.Item>
      <List.Item>
        <div>5時間前</div>
        <div>前回のプレイ</div>
      </List.Item>
    </List>
  );
};

export default UserOverview;
