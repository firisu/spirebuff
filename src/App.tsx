import React from "react";
import { Container, Header, Segment, List } from "semantic-ui-react";

import { useRuns } from "./rootReducer";
import UserOverview from "./components/UserOverview";

const App: React.FC = () => {
  const runs = useRuns();
  const runCount = Object.values(runs).flat().length;

  return (
    <Container>
      <UserOverview />
    </Container>
  );
};

export default App;
