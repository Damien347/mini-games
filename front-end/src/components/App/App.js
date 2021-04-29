import Game from '../TicTocToe/Game/Game';

import Hanged from '../Hanged/Hanged';
import Tetris from '../Tetris/Tetris';

import './App.css';

function App() {
  return (
    <div id="App">

      <div className="morpion">

        <Game className='test'/>

      </div>

      <div className="hanged">

        <Hanged />
      </div>


      <div className="tetris">

        <Tetris />
      </div>

    </div>
  );
}

export default App;
