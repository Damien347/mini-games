import React from 'react';

const Keyboard = ({alphabet, action})=> {

    return (
        <div className='keyboard'>
            {
                alphabet.map(
                    (letter, key) => { 
                        return <button onClick={()=> action(letter)} key={'letter'+ key}>{letter}</button>}
                )
            }
        </div>
    )
}

export default Keyboard;