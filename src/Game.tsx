import React, {useEffect, useState} from 'react';
import {Card} from './models/Card';
import Turns from './components/Turns';
import Points from './components/Points';
import CardItem from './components/CardItem';

import card_bulbasaur from './images/card_bulbasaur.jpeg';
import card_charizard from './images/card_charizard.jpeg';
import card_garchomp from './images/card_garchomp.png';
import card_luxray from './images/card_luxray.png';
import card_pikachu from './images/card_pikachu.png';
import card_shaymin from './images/card_shaymin.png';

import './Game.css';

const cardImages = [
    {src: card_bulbasaur},
    {src: card_charizard},
    {src: card_garchomp},
    {src: card_luxray},
    {src: card_pikachu},
    {src: card_shaymin},
];

const generateID = () => {
    return Math.random();
};

const Game: React.FC = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [revealed, setRevealed] = useState<boolean>(false);

    const [cards, setCards] = useState<Card[]>();

    const [turns, setTurns] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);

    const [firstChoice, setFirstChoice] = useState<Card | null>();
    const [secondChoice, setSecondChoice] = useState<Card | null>();

    /**
     * Start a new game instance
     */
    const handleNewGame = () => {
        setGameOver(false);
        setGameStarted(true);
        shuffleCards();
        setFirstChoice(null);
        setSecondChoice(null);
        setRevealed(false);
        setTurns(0);
        setPoints(0);
    };

    /**
     * Shuffle cards randomly and attach the initial properties for each card.
     * Add the shuffled cards to the state
     */
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => {
                return {
                    ...card,
                    id: generateID(),
                    matched: false,
                };
            });
        setCards(shuffledCards);
    };

    /**
     * based on the first or second choice, record the user's choice
     */
    const handleSelection = (card: Card) => {
        if (firstChoice) {
            // check if the ID doesn't match the already stored choice
            if (firstChoice.id !== card.id) {
                setSecondChoice(card);
            }
        } else {
            // check if the ID doesn't match the already stored choice
            if (secondChoice?.id !== card.id) {
                setFirstChoice(card);
            }
        }
    };

    /**
     * Reset the user's turn. Nullify first and second card choice
     */
    const resetTurn = () => {
        setFirstChoice(null);
        setSecondChoice(null);
        setTurns((prevTurns) => prevTurns + 1);
    };

    /**
     * check if the first and second choice are provided
     * check if the first and second choice are the same
     */
    useEffect(() => {
        if (firstChoice && secondChoice) {
            setDisabled(true);
            if (firstChoice.src === secondChoice.src) {
                setPoints((prevPoints) => prevPoints + 10);
                setCards((prevCards) => {
                    return prevCards?.map((card) => {
                        // doesn't matter if compared first or second choice -- they are the same
                        if (card.src == firstChoice.src) {
                            return {...card, matched: true};
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
                setDisabled(false);
            } else {
                setTimeout(() => {
                    resetTurn();
                    setDisabled(false);
                }, 1300);
            }
        }
    }, [firstChoice, secondChoice]);

    /**
     * Allow for all cards to be revealed.
     * Reset all points, and turns.
     */
    const handleRevealCards = () => {
        setCards((prevCards) => {
            return prevCards?.map((card) => {
                return {...card, matched: true};
            });
        });
        setRevealed(true);
        setGameOver(true);
        setTurns(0);
        setPoints(0);
    };

    /**
     * check if there are remaining cards to flip over and set game over state based on that
     */
    useEffect(() => {
        let remaining = 0;
        cards?.map((card) => {
            return !card.matched ? remaining++ : remaining;
        });
        if (gameStarted && remaining == 0) {
            setGameOver(true);
        }
    }, [cards]);

    return (
        <div className='game'>
            <button className='new-game-button' onClick={handleNewGame}>
                New Game
            </button>

            {gameStarted && <hr className='separator game-options__separator'/>}

            <div className='game-options'>
                <div className='game-options__points'>
                    <Points points={points} gameStarted={gameStarted}/>
                </div>
                <div className='game-options__turns'>
                    <Turns turns={turns} gameStarted={gameStarted}/>
                </div>

                {cards && !revealed && !gameOver && (
                    <button
                        className='reveal-cards-button game-options__reveal-button'
                        onClick={handleRevealCards}
                    >
                        Reveal Cards
                    </button>
                )}

                {gameOver && (
                    <span
                        className={
                            revealed ? 'error-red game-over' : 'game-over success-green'
                        }
                    >
            {revealed ? 'Game Over' : 'You Won'}
          </span>
                )}
            </div>

            {gameStarted && <hr className='separator'/>}

            <div className='card__grid'>
                {cards?.map((card) => {
                    return (
                        <CardItem
                            card={card}
                            key={card.id}
                            flipped={
                                card == firstChoice || card === secondChoice || card.matched
                            }
                            disabled={disabled}
                            handleSelection={() => handleSelection(card)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Game;
