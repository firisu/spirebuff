import React from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container, Grid, Header, Dimmer, Loader } from "semantic-ui-react";

import { useLoadRuns } from "modules/runs";
import { useRuns } from "rootReducer";
import AppMenu from "components/AppMenu";
import UserOverview from "components/UserOverview";

import Top from "pages/Top";
import Winrates from "pages/Winrates";

const App: React.FC = () => {
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
              <Redirect to="/" />
            </Switch>
          </Grid.Row>
        </Grid>
      </Container>
    </HashRouter>
  );
};

export default App;
