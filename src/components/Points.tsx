import React from 'react';

interface Props {
  points: number;
  gameStarted: boolean;
}

const Points: React.FC<Props> = ({ points, gameStarted }) => {
  return gameStarted ? <div>Points: {points}</div> : <></>;
};

export default Points;
