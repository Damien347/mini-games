import React from 'react';

import './Tetris.css';

function Options({ actions} ) {
    return (
        <div> 
            <h1> Options </h1>
            <button onClick={()=> actions.launchMenu()}> retour </button>

        </div>
    )
} 

export default Options;