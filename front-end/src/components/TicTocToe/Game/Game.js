import React, {Component} from 'react'; 
import './Game.css';

import Board from '../Board/Board';
import Menu from './Menu';

class Game extends Component {

  state = {
    componentToLoaded: Menu,
    actions: {
      launchGame: ()=> this.launchGame()
  }

  }


  launchGame = () => {
    this.setState({componentToLoaded: Board})
}

    render() {

      return (
        <div className="game">
          <div className="game-board">
            {<this.state.componentToLoaded actions={this.state.actions}/>}
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;