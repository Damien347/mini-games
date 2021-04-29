import React from 'react';

import './Tetris.css';

function Menu( {actions} ) {
    return (
        <div> 
            <h1> Tetris </h1>
            <button onClick={()=> actions.launchGame()}> Play </button>
            <button onClick={()=> actions.launchOptions()}> Options </button>

        </div>
    )
} 

export default Menu;