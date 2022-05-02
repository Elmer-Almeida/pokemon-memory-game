import React from 'react';

interface Props {
  turns: number;
  gameStarted: boolean;
}

const Turns: React.FC<Props> = ({ turns, gameStarted }) => {
  return gameStarted ? <div>Turns: {turns}</div> : <></>;
};

export default Turns;
