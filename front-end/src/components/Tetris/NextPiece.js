import React from 'react';
import './Tetris.css'; 

function NextPiece({grid}) {
    return (
        <div id='nextPiece' className='grid'>
        {grid.map(
            (line, y) => {
                return line.map(
                    (col, x) => {
                        let classes = []
                        let value = 0
                        if(x === 0 ){
                            classes.push('first')
                        }

                        if(grid[y][x] > 0) {
                            classes.push('color')
                            value = grid[y][x]
                        }
                        return <span key={x + '_' + y} className={classes.join(' ')}>
                            { value }
                            </span>
                    }
                )
            }
        )}

    </div>
    )
}

export default NextPiece;