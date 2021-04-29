import React, {Component} from 'react';
import './Hanged.css';

import Keyboard from './Keyboard';
import Currentword from './CurrentWord';
import Menu from '../Tetris/Menu';

class Hanged extends Component {

    state = {
        wordsCollection: ['ordinateur', 'facebook', 'highTech', 'imprimante', 'telephone', 'souris'],
        currentWord: null,
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
        // alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        //  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
         usedLetter: [],
         win: 0,
         attempt: 0


    }

    componentDidMount () {
        this.initGame()
    }
    
    
    
    initGame = ()=> {
        this.setState({
            currentWord: this.newWord(), 
            usedLetter:[]})
    }


    clickLetter = (letter) => {
        console.log('je suis' + letter)
        if (this.state.usedLetter.indexOf(letter) === -1) {
            const usedLetter = [ letter, ...this.state.usedLetter ]
            console.log(usedLetter.indexOf())
            console.log(usedLetter)

            if(this.state.currentWord.indexOf(letter) === -1 ) {
                const attempt = this.state.attempt +1
                this.setState({attempt})
            } else {
                this.setState({usedLetter})
            }

            
        } else {
            console.log('lettre deja traiter')

        }
    }

    newWord = ()=> {
        const randomIndex = Math.floor(Math.random() * this.state.wordsCollection.length)
        return this.state.wordsCollection[randomIndex]
    }

    


    render() {
        return (
            <div className='hangedGame'>
                {this.state.attempt}
                {
                    
                    (this.state.currentWord !== null) && 
                    <Currentword currentWord={this.state.currentWord}
                    usedLetter={this.state.usedLetter}/>
                }

                <Keyboard alphabet={this.state.alphabet} action={this.clickLetter}/>
            </div>
        )
    }

}

export default Hanged;