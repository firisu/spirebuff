import React from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Container, Grid, Header, Dimmer, Loader } from "semantic-ui-react";

import { useLoadRuns } from "modules/runs";
import { useRuns } from "rootReducer";
import AppMenu from "components/AppMenu";
import UserOverview from "components/UserOverview";

import { LanguageContext, GameLanguage } from "modules/localization";

import Top from "pages/Top";
import Winrates from "pages/Winrates";
import Cards from "pages/Cards";
import Relics from "pages/Relics";
import Events from "pages/Events";
import Monsters from "pages/Monsters";
import Records from "pages/Records";
import NotFound from "pages/NotFound";

const App: React.FC = () => {
  // 言語設定
  // NOTE: setLanguage は言語切替ボタンを実装してから使う
  const [language] = React.useState<GameLanguage>("jpn");

  // ローカルからRUNファイルをロードする
  const dispatch = useDispatch();
  useLoadRuns(dispatch);

  // storeのRUNデータを読み込む
  const runs = useRuns();
  const runCount = Object.values(runs).flat().length;

  // ロード中
  if (runCount === 0) {
    return (
      <Container>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Container>
    );
  }

  return (
    <HashRouter>
      <LanguageContext.Provider value={language}>
        <Container className="app">
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <Header inverted size="huge">
                  Spirebuff.app
                </Header>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <UserOverview />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <AppMenu />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Switch>
                <Route path="/" exact component={Top} />
                <Route path="/winrates" exact component={Winrates} />
                <Route path="/cards" exact component={Cards} />
                <Route path="/relics" exact component={Relics} />
                <Route path="/events" exact component={Events} />
                <Route path="/monsters" exact component={Monsters} />
                <Route path="/records" exact component={Records} />
                <Route component={NotFound} />
              </Switch>
            </Grid.Row>
          </Grid>
        </Container>
      </LanguageContext.Provider>
    </HashRouter>
  );
};

export default App;
