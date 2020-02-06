import React from 'react';
import Tile from './Tile';
import './Game.css'
import { generateDifficultyValue, getDifficultyColor } from './helperFunctions'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n_rows: this.props.n_rows,
            n_cols: this.props.n_cols,
            mean: this.props.n_rows / 2,
            grid: undefined
        }
        // bindings
        this.generateGrid = this.generateGrid.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    componentDidMount() {
        // Add logic here to retreive grid state from database once created
        let initialGrid = this.generateGrid()
        const startingCoord = Math.floor(this.state.n_rows / 2) + '-' + Math.floor(this.state.n_cols / 2);
        this.setOpen(startingCoord, initialGrid)
        this.setState({
            grid: initialGrid
        });
        // Sets an initial cell (approximately at the center) to open

    }

    generateGrid() {
        let grid = [];
        while (this.state.n_rows > grid.length) {
            let row = [];
            for (let i = 0; i < this.state.n_cols; i++) {
                row.push({
                    isActive: false,
                    isOpen: false
                })
            }
            grid.push(row);
        }
        return grid
    }

    setOpen(coord, grid = this.state.grid) {
        let { n_cols, n_rows } = this.state;
        let [y, x] = coord.split("-").map(Number);

        function activateTile(y, x) {
            if (x >= 0 && x < n_cols && y >= 0 && y < n_rows) {
                grid[y][x].isActive = true
            }
        }

        grid[y][x].isOpen = true;
        
        activateTile(y, x + 1);
        activateTile(y, x - 1);
        activateTile(y - 1, x);
        activateTile(y + 1, x);

        this.setState({ ...this.state, grid: grid })
    }

    render() {
        let renderGameGrid = [];
        if(this.state.grid) {
            for (let y = 0; y < this.state.n_rows; y++) {
                let row = [];
                for (let x = 0; x < this.state.n_cols; x++) {
                    let coord = `${y}-${x}`;
                    let difficultyValue = generateDifficultyValue(this.state.n_rows, x, y)
                    let difficultyColor = getDifficultyColor(this.state.n_rows, difficultyValue)
                    row.push(
                        <Tile setOpen={() => this.setOpen(coord)} isActive={this.state.grid[y][x].isActive} isOpen={this.state.grid[y][x].isOpen} key={coord} id={coord} difficultyValue={difficultyValue} color={difficultyColor} value={''}/>
                    )
                }
                renderGameGrid.push(<tr key={`row-${y}`}>{row}</tr>)
            }
    }
    
        return(
            <div className='Game'>
                <table>
                    <tbody>
                        {renderGameGrid}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Game;