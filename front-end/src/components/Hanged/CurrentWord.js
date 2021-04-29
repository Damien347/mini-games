import React from 'react';

const CurrentWord = ({currentWord, usedLetter})=> {

    return (
        <div className='currentWord'>
           {currentWord.split('').map(
               (letter, key) => {
                  let status = 'finded'
                   if (usedLetter.indexOf(letter) == -1) {
                       console.log('current' + usedLetter.indexOf(letter))
                        status = 'notFinded'
                   }
                   return <span key={"letter_" + key} className={status} >{status === "notFinded" ? '?' : letter }</span>
               }
           )}
        </div>
    )
}

export default CurrentWord;