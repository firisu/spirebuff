import React from "react";
import { Container, Grid } from "semantic-ui-react";

import { useRuns } from "./rootReducer";
import UserOverview from "./components/UserOverview";

const App: React.FC = () => {
  const runs = useRuns();
  const runCount = Object.values(runs).flat().length;

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <UserOverview />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>最新のプレイ(20件)</Grid.Column>
          <Grid.Column width={6}>プレイ回数</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default App;
