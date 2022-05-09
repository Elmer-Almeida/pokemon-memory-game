import React from 'react';
import Footer from './components/Footer';
import './App.css';
import Game from "./Game";

const App: React.FC = () => {
    return (
        <div className='App'>
            <div className='content'>
                <h1 className='headline'>Memory Game</h1>
                <p className="about">A simple Pokemon<sup><small>&copy;</small></sup> game application made with React
                    and Typescript.</p>
                <Game/>
            </div>
            <Footer/>
        </div>
    );
};

export default App;
