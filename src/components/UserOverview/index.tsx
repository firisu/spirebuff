import React from "react";
import { List } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/ja";

import "./style.scss";
import { useRuns } from "../../rootReducer";

import { useRunCountsByColor, useMaxLevelsByColor } from "../../modules/runs";

const UserOverview = () => {
  const runs = useRuns();
  const runCounts = useRunCountsByColor();
  const maxLevels = useMaxLevelsByColor();
  const lastRun = runs[runs.length - 1];
  const lastDatetime = moment(lastRun.timestamp * 1000).fromNow();

  return (
    <List className="useroverview" inverted divided horizontal size="small">
      <List.Item>
        <div>
          <span className="red">{runCounts["RED"]}</span>/
          <span className="green">{runCounts["GREEN"]}</span>/
          <span className="blue">{runCounts["BLUE"]}</span>
        </div>
        <div>プレイ回数</div>
      </List.Item>
      <List.Item>
        <div>{Object.values(maxLevels).join("/")}</div>
        <div>アセンション</div>
      </List.Item>
      <List.Item>
        <div>{lastDatetime}</div>
        <div>前回のプレイ</div>
      </List.Item>
    </List>
  );
};

export default UserOverview;
