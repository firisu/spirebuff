import React from "react";

import { useCards } from "modules/cards";

interface Props {
  id: string;
}

const CardName = (props: Props) => {
  const { getCardInfo } = useCards();

  const { id } = props;
  const card = getCardInfo(id);

  return (
    <div className="card-text" data-rarity={card.rarity}>
      {card.name}
    </div>
  );
};

export default CardName;
