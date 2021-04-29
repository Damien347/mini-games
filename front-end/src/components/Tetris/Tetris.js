import React, { Component } from 'react';
import Menu from './Menu';
import Game from './Game';
import Options from './Options';

import './Tetris.css';

class Tetris extends Component {

    state = {
        componentToLoaded: Menu,
        actions: {
            launchGame: ()=> this.launchGame(),
            launchOptions: ()=> this.launchOptions(),
            launchMenu: ()=> this.launchMenu() 
    }

    }

    launchGame = () => {
        this.setState({componentToLoaded: Game})
    }

    launchOptions = () => {
        this.setState({componentToLoaded: Options})
    }

   
    launchMenu = ()=> {
        this.setState({componentToLoaded: Menu})
    }


render() {
    return (
        <div>

            {
            <this.state.componentToLoaded actions={this.state.actions}/>
            }

        </div>
    )
}
}

export default Tetris;