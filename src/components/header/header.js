import React from 'react';



const Header = () => {
    return (
        <div>
            <h1>Hangman</h1>
            <p>Enter a letter to find the hidden word! <span role='img' aria-label="smiley" style={{ 'font-size': 20 }}>😏</span></p>
        </div>
    )
}


export default Header;