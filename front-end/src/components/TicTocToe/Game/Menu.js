import React from 'react';


function Menu( {actions} ) {
    return (
        <div> 
            <h1> Morpion </h1>
            <button onClick={()=> actions.launchGame()}> Play </button>

        </div>
    )
} 

export default Menu;