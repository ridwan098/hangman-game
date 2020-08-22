import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
import Figure from './components/figure/figure';
import WrongLetters from './components/wrongLetters/wrongLetters';
import Word from './components/word';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


const App = () => {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);

    useEffect(() => {
        const handleKeydown = event => {
            const { key, keyCode } = event;


            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(currentLetters => [...currentLetters, letter])

                    } else {
                        // showNotification();
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setCorrectLetters(wrongLetters => [...wrongLetters, letter])

                    } else {
                        // showNotification();
                    }
                }
            }

        }
        window.addEventListener('keydown', handleKeydown)

        return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    return (
        <div>
            <Header />
            <div className='game-container'>
                <Figure />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>
        </div>
    )

}


export default App;