import React from "react";

import { useRelics } from "modules/relics";

interface Props {
  id: string;
}

const RelicName = (props: Props) => {
  const { getRelicInfo } = useRelics();

  const { id } = props;
  const relic = getRelicInfo(id);

  return (
    <div className="relic-name" data-tier={relic.tier}>
      {relic.name}
    </div>
  );
};

export default RelicName;
