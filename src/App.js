import React, { useState, useEffect } from 'react';
import Header from './components/header/header';
import Figure from './components/figure/figure';
import WrongLetters from './components/wrongLetters/wrongLetters';
import Word from './components/word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = ['application', 'programming', 'interface', 'wizard', 'cat', 'lion', 'dog', 'china', 'uk', 'rome', 'spain', 'monkey'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const handleKeydown = event => {
            const { key, keyCode } = event;
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(currentLetters => [...currentLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters(currentLetters => [...currentLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    function playAgain() {
        setPlayable(true);

        // Empty Arrays
        setCorrectLetters([]);
        setWrongLetters([]);

        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    }

    return (
        <div className='center-item'>
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>
            <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
            <Notification showNotification={showNotification} />
            <div />
            {/* <Footer /> */}
            <div class="container" style={{ 'margin-top': 150 }}><small>Copyright © <a href="https://ridwan.co.uk" target="_blank" rel="noopener noreferrer">Ridwan
            Gbadamosi</a> 2020</small></div>
        </div>
    );
}

export default App;