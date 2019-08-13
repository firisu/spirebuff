import React from "react";
import { Grid, Header } from "semantic-ui-react";

import { useRuns } from "rootReducer";
import RunTable from "components/RunTable";
import TopSidebar from "components/TopSidebar";

const LATEST_RUNS_COUNT = 10;

const Top = () => {
  const runs = useRuns();
  const latestRuns = runs.slice(-LATEST_RUNS_COUNT).reverse();

  return (
    <>
      <Grid.Column width={10}>
        <Header inverted size="small">
          最新のプレイ({LATEST_RUNS_COUNT}件)
        </Header>
        <RunTable runs={latestRuns} />
      </Grid.Column>
      <Grid.Column width={6}>
        <TopSidebar />
      </Grid.Column>
    </>
  );
};

export default Top;
