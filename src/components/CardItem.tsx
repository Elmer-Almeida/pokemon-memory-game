import React from 'react';
import { Card } from '../models/Card';
import card_back from '../images/card_back.jpeg';

interface Props {
  card: Card;
  flipped: boolean;
  disabled: boolean;
  handleSelection: (card: Card) => void;
}

const CardItem: React.FC<Props> = ({
  card,
  flipped,
  disabled,
  handleSelection,
}) => {
  const handleCardSelection = (card: Card) => {
    if (!disabled) handleSelection(card);
  };

  return (
    <div className='card' onClick={() => handleCardSelection(card)}>
      <div className={flipped ? 'card__flipped' : ''}>
        <img src={card.src} alt={card.src} className='card__front' />
        <img src={card_back} alt={card_back} className='card__back' />
      </div>
    </div>
  );
};

export default CardItem;
