import React from 'react';

function Grid({ grid, piece }) {

    let projectionCoordinate =[]
if (piece) { 
    projectionCoordinate = getProjection(grid, piece, grid.length -1)
}
    // console.log('le console log que je cherche' + piece.mergeData.indexOf())
    return (
        <div className='grid'>
            {grid.map(
                (line, y) => {
                    return line.map(
                        (col, x) => {
                            let classes = []
                            let value = 0
                            if(x === 0 ){
                                classes.push('first')
                            }
                            if(piece !== null) {
                                if (piece.mergeData.indexOf(y + '-' + x) !== -1) {
                                    classes.push('color')
                                    value = piece.color
                                }
                            }

                            if (projectionCoordinate.indexOf(y + '-' + x) !== -1) {
                                classes.push('projection')
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



function getProjection(grid, piece)  {


    let coordonate = []
    let previousCoordinate = []

    for (let virtualY = piece.posY; virtualY < grid.length; virtualY++) {
        previousCoordinate = coordonate
        coordonate = []

        for (let y = 0; y < piece.grid.length; y++) {
            for (let x = 0; x < piece.grid[0].length; x++) {
                if (piece.grid[y][x] > 0) {
    
                    if (grid[y + virtualY] === undefined) {
                        return previousCoordinate
                    }
                    if (grid[y + virtualY][x + piece.posX] > 0) {
                        return previousCoordinate
                    }
                    coordonate.push((y + virtualY) + '-' + (x + piece.posX))
                }
    
            }
        }

    }

        return coordonate













    // let coordonate = []
    // for (let y = 0; y < piece.grid.length; y++) {
    //     for (let x = 0; x < piece.grid[0].length; x++) {
    //         if (piece.grid[y][x] > 0) {


    //             if(virtualY <= 0 ) {
    //                 return false
    //             }

    //             if (grid[y + virtualY] === undefined) {
    //                 virtualY--
    //                 return getProjection(grid, piece, virtualY)
    //             }
    //             if (grid[y + virtualY][x + piece.posX] > 0) {
    //                 virtualY--
    //                 return getProjection(grid, piece, virtualY)
    //             }
    //             coordonate.push((y + virtualY) + '-' + (x + piece.posX))
    //         }

    //     }
    // }
    // return coordonate
}




export default Grid;