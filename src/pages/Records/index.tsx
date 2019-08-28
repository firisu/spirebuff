import React from "react";
import {
  Grid,
  Menu,
  Segment,
  Statistic,
  Popup,
  Icon,
  Table,
  Header
} from "semantic-ui-react";

import DropdownLevel from "components/DropdownLevel";
import { characterNames, charNameMap } from "modules/chars";

import "./style.scss";
import {
  useAct4WinStreaks,
  useMaxScores,
  useAltWinStreak,
  useAvgStats
} from "./utils";

const Records = () => {
  const [level, setLevel] = React.useState(20);

  const alt = useAltWinStreak(level);
  const act4WinStreaks = useAct4WinStreaks(level);
  const maxScores = useMaxScores(level);
  const avgStats = useAvgStats(level);

  return (
    <Grid.Column width={16} className="records-grid">
      <Menu inverted>
        <Menu.Item>
          <DropdownLevel value={level} setFunction={setLevel} />
        </Menu.Item>
      </Menu>

      <Segment inverted attached>
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
              <span className="red">{act4WinStreaks.IRONCLAD}</span> /{" "}
              <span className="green">{act4WinStreaks.THE_SILENT}</span> /{" "}
              <span className="blue">{act4WinStreaks.DEFECT}</span>
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Segment>

      <Segment inverted attached>
        <Statistic.Group inverted widths="1">
          <Statistic>
            <Statistic.Label>最大スコア</Statistic.Label>
            <Statistic.Value>
              <span className="red">{maxScores.IRONCLAD}</span> /{" "}
              <span className="green">{maxScores.THE_SILENT}</span> /{" "}
              <span className="blue">{maxScores.DEFECT}</span>
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Segment>

      <Segment inverted attached>
        <Header inverted size="huge">
          平均データ
        </Header>
        <Table inverted sortable selectable celled size="small" compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}></Table.HeaderCell>
              <Table.HeaderCell width={1}>
                {charNameMap[characterNames[0]]}
              </Table.HeaderCell>
              <Table.HeaderCell width={1}>
                {charNameMap[characterNames[1]]}
              </Table.HeaderCell>
              <Table.HeaderCell width={1}>
                {charNameMap[characterNames[2]]}
              </Table.HeaderCell>
              <Table.HeaderCell>備考</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>エリート討伐数</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-elite-${char}`}>
                  {(avgStats[char].elite / avgStats[char].count).toFixed(1)}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>スコア</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-score-${char}`}>
                  {Math.floor(avgStats[char].score / avgStats[char].count)}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>デッキ枚数</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-deckVolume-${char}`}>
                  {(avgStats[char].deckVolume / avgStats[char].count).toFixed(
                    1
                  )}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>レリック数</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-relic-${char}`}>
                  {(avgStats[char].relic / avgStats[char].count).toFixed(1)}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>キャンプ（休憩）</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-campRest-${char}`}>
                  {(avgStats[char].campRest / avgStats[char].count).toFixed(1)}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>キャンプ（鍛冶）</Table.Cell>
              {characterNames.map(char => (
                <Table.Cell key={`avg-campSmith-${char}`}>
                  {(avgStats[char].campSmith / avgStats[char].count).toFixed(1)}
                </Table.Cell>
              ))}
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </Grid.Column>
  );
};

export default Records;
