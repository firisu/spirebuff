import React from "react";
import { Grid, Menu, Segment, Statistic, Popup, Icon } from "semantic-ui-react";

import DropdownLevel from "components/DropdownLevel";

import "./style.scss";
import { useAct4WinStreaks, useMaxScores, useAltWinStreak } from "./utils";

const Records = () => {
  const [level, setLevel] = React.useState(20);

  const alt = useAltWinStreak(level);
  const act4WinStreaks = useAct4WinStreaks(level);
  const maxScores = useMaxScores(level);

  return (
    <Grid.Column width={16} className="records-grid">
      <Menu inverted>
        <Menu.Item>
          <DropdownLevel value={level} setFunction={setLevel} />
        </Menu.Item>
      </Menu>

      <Segment inverted attached="top">
        <Statistic.Group inverted widths="2">
          <Statistic>
            <Statistic.Label>
              通しキャラ連勝数(act4)
              <Popup
                content="使用キャラを切り替えながら連勝した回数。同じキャラを連続で使った場合はカウントが途切れる。"
                trigger={<Icon name="info circle" />}
                size="tiny"
              />
            </Statistic.Label>
            <Statistic.Value>{alt}</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>
              同キャラ連勝数(act4)
              <Popup
                content="同キャラだけを見た場合の連勝数。間に他のキャラで敗北してもOK。"
                trigger={<Icon name="info circle" />}
                size="tiny"
              />
            </Statistic.Label>
            <Statistic.Value>
              {act4WinStreaks.IRONCLAD} / {act4WinStreaks.THE_SILENT} /{" "}
              {act4WinStreaks.DEFECT}
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Segment>

      <Segment inverted attached="bottom">
        <Statistic.Group inverted widths="1">
          <Statistic>
            <Statistic.Label>最大スコア</Statistic.Label>
            <Statistic.Value>
              {maxScores.IRONCLAD} / {maxScores.THE_SILENT} / {maxScores.DEFECT}
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </Grid.Column>
  );
};

export default Records;
