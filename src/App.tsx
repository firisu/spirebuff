import React from "react";
import { useDispatch } from "react-redux";
import { Container, Grid, Header, Dimmer, Loader } from "semantic-ui-react";

import { useRuns } from "./rootReducer";
import { useLoadRuns } from "./modules/runs";
import UserOverview from "./components/UserOverview";
import RunTable from "./components/RunTable";
import TopSidebar from "./components/TopSidebar";

const LATEST_RUNS_COUNT = 10;

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

  const latestRuns = runs.slice(-LATEST_RUNS_COUNT).reverse();

  return (
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
          <Grid.Column width={10}>
            <Header inverted size="tiny">
              最新のプレイ({LATEST_RUNS_COUNT}件)
            </Header>
            <RunTable runs={latestRuns} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TopSidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default App;
