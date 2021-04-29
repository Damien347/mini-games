import React, { Component } from 'react';
import Grid from './Grid';
import Pieces from './Pieces';
import NextPiece from './NextPiece';

import './Tetris.css';

class Game extends Component {

    state = {
        grid: null,
        heightOfGrid: 10,
        WidthOfGrid: 8,
        piece: null, 
        nbrCleanLine: 0,
        lvl: 1,
        nextPieceIndex: null,
        end: false

    }

    componentDidMount() {

        this.initGame()


        //     onkeyup('keyup', (e)=> {
        //         switch (e.keyCode) {
        //                     case 39: this.pieceMoveToAxisX(1)
        //                         break
        //                     case 37: this.pieceMoveToAxisX(-1)
        //                         break
        //                     case 40: this.pieceMoveToAxisY(1)
        //                         break
        //     }
        // })


        window.addEventListener('keyup', (e) => {
            console.log(e)
            // 37 : gauche, 39 right, 40 bas, 81 q, 68 d
            switch (e.keyCode) {
                case 39: this.pieceMoveToAxisX(1)
                    break
                case 37: this.pieceMoveToAxisX(-1)
                    break
                case 40: this.pieceMoveToAxisY(1)
                    break
                case 81: this.rotatePiece('right')
                    break
                case 68: this.rotatePiece('left')
                    break
                default: break
            }
        })

       


    }

    initGame = () => {
        this.setState({ grid: this.buildGrid(), nextPieceIndex: this.generateNextPieceIndex()}, () => {
            this.generatePiece()

           this.launchTimer()
        })

    }

    launchTimer = ()=> {
        this.timer = setInterval(() => {
            this.pieceMoveToAxisY(1)
        }, this.convertLvlToTime())
    }

    convertLvlToTime = ()=>{
        if(this.state.lvl === 1) {
            return 2000
        } else if (this.state.lvl === 2) {
            return 1000
        } else if (this.state.lvl === 3) {
            return 500
        }

    }


    // creation de la grille
    buildGrid = () => {
        let grid = []
        for (let y = 0; y < this.state.heightOfGrid; y++) {
            let line = []
            for (let x = 0; x < this.state.WidthOfGrid; x++) {
                line.push(0);
            }
            grid.push(line)
        }
        return grid
    }

    // fusion des pieces
    mergePieceToGrid = () => {
        const virtualGrid = this.state.grid
        let nbrCleanLine = this.state.nbrCleanLine
        let lvl = this.state.lvl
        let lvlChanged = false

        this.state.piece.mergeData.forEach(element => {
            const [y, x] = (element.split('-'))
            virtualGrid[y][x] = this.state.piece.color
        });
        let {cleanGrid, nbLineCompleted} = this.cleanGrid(virtualGrid)
        nbrCleanLine += nbLineCompleted

        if(nbrCleanLine > 1) {
            lvl = 2
            clearInterval(this.timer)
            lvlChanged = true
            
        }

        this.setState({ grid: cleanGrid, piece: null, nbrCleanLine : nbrCleanLine, lvl }, () => {
         
            this.generatePiece()
            if (lvlChanged) {

                this.launchTimer()
            }
        })
    }


    endGame = ()=> {
        clearInterval(this.timer)
        this.setState({end: true})
    }


generateNextPieceIndex() {
    return Math.floor(Math.random() * Pieces.length)
}


    // function de creation de piece
    generatePiece = () => {
        let piece = {}
        piece.posY = 0
        let indexPieces = this.state.nextPieceIndex
        piece.color = indexPieces + 1 // +1 pour qu'il n'y est pas 0 qui serait une case vide
        
        piece.grid = Pieces[indexPieces]
            if (piece.grid[0][0] === 0) {
                piece.posY--
            }

            //centrage de la piece
        piece.posX = Math.floor((this.state.WidthOfGrid - piece.grid[0].length) / 2)
        
        piece.mergeData = []

        let coordinate = this.canHandlePiece(piece)
        if (coordinate !== false) {
            piece.mergeData = coordinate
            this.setState({ piece, nextPieceIndex:this.generateNextPieceIndex() })
        } else {
            clearInterval(this.timer)
            this.endGame()
        }

    }


    // Fuction qui verifie qu'une piece peut ou ne peut pas bouger
    canHandlePiece = (piece) => {

        let coordonate = []
        for (let y = 0; y < piece.grid.length; y++) {
            for (let x = 0; x < piece.grid[0].length; x++) {
                if (piece.grid[y][x] > 0) {

                    if (this.state.grid[y + piece.posY] === undefined) {
                        return false
                    }

                    if (this.state.grid[y + piece.posY][x + piece.posX] === undefined) {
                        return false
                    }
                    if (this.state.grid[y + piece.posY][x + piece.posX] > 0) {
                        return false
                    }
                    coordonate.push((y + piece.posY) + '-' + (x + piece.posX))
                }

            }
        }
        return coordonate
    }


    cleanGrid = (grid)=> {

        let cleanGrid = []
        let nbLineCompleted = 0

        for (let y = 0; y < this.state.heightOfGrid; y++) {
            let lineCompleted = true
            for (let x = 0; x < this.state.WidthOfGrid; x++) {
                if (grid[y][x] === 0) {
                    lineCompleted = false
                }
            }
            if(lineCompleted === false) {
                cleanGrid.push(grid[y])
            } 
   
        }
        nbLineCompleted = this.state.heightOfGrid - cleanGrid.length
        for (let i = 0; i < nbLineCompleted; i++) {
            cleanGrid.unshift( this.newLineClean(this.state.WidthOfGrid))
        }
        return {cleanGrid, nbLineCompleted}

    }



    newLineClean(width) {
        let line = []
        for (let x = 0; x < width; x++) {
            line.push(0)
        }
        return line

    }


    rotatePiece = (sense) => {

        let piece = { ...this.state.piece }
        if (piece === null) {
            return false
        }

        let newGrid = []



        if (sense === 'right') {
            for (let x = 0; x < piece.grid[0].length; x++) {
                let line = []
                for (let y = piece.grid.length - 1; y > -1; y--) {
                    line.push(piece.grid[y][x])
                }
                newGrid.push(line)
            }
        } else if (sense === 'left') {
            for (let x = piece.grid[0].length - 1; x > -1; x--) {
                let line = []
                for (let y = 0; y < piece.grid.length; y++) {
                    line.push(piece.grid[y][x])
                }
                newGrid.push(line)
            }
        }
        piece.grid = newGrid
        let coordinate = this.canHandlePiece(piece)

        if (coordinate !== false) {
            piece.mergeData = coordinate
            this.setState({ piece })
        } else {

            let isPositionUpdate = false
            // pas de rotation
            if (piece.posX < 0) {
                piece.posX = 0
                isPositionUpdate = true
            } else if (piece.grid[0].length + piece.posX > this.state.WidthOfGrid) {
                piece.posX = this.state.WidthOfGrid - piece.grid[0].length
                isPositionUpdate = true
            } else if (piece.posY < 0) {
                piece.posY = 0
                isPositionUpdate = true
            }

            if (isPositionUpdate) {
                coordinate = this.canHandlePiece(piece)
                if (coordinate !== false) {
                    piece.mergeData = coordinate
                    this.setState({ piece })
                }

            }
        }
    }





// Piece bouge a droite ou gauche
pieceMoveToAxisX = (deltaX) => {
    let piece = { ...this.state.piece }
    if (piece === null) {
        return false
    }

    piece.posX += deltaX

    let coordinate = this.canHandlePiece(piece)
    if (coordinate !== false) {
        piece.mergeData = coordinate
        this.setState({ piece })
    }

}


// Piece bouge en bas
pieceMoveToAxisY = (deltaY) => {
    let piece = { ...this.state.piece }
    if (piece === null) {
        return false
    }

    piece.posY += deltaY

    let coordinate = this.canHandlePiece(piece)
    if (coordinate !== false) {
        piece.mergeData = coordinate
        this.setState({ piece })
    } else {
        this.mergePieceToGrid()
    }

}

render() {
    return (
        <div>

         
            <p className='score'>Score : {this.state.nbrCleanLine} </p>
            <p className='lvl'>Niveau : {this.state.lvl} </p>
            <p> next Piece </p>
            {this.state.nextPieceIndex !== null && 
            <NextPiece grid={Pieces[this.state.nextPieceIndex]}/>
            }

            {
                this.state.grid !== null &&
                <Grid grid={this.state.grid} piece={this.state.piece} />
            }

            {
                (this.state.end === true) && 
                <button onClick={()=> this.props.actions.launchMenu()}> retour </button>
            }

        </div>
    )
}
}

export default Game;