import React from 'react';
import { getTimeCost } from './helperFunctions';
import './Tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            color: this.props.difficultyColor,
            isOpen: this.props.isOpen,
            isActive: this.props.isActive
        }
        // bindings
        this.handleClick = this.handleClick.bind(this);
        this.activateTile = this.activateTile.bind(this);
    }

    handleClick() {
        if(this.props.isActive && !this.props.isOpen) {
            this.setState({ inProgress: true }, () => {
                setTimeout(this.activateTile, getTimeCost(this.props.difficultyValue));
            })
        }
    }

    activateTile() {
        this.props.setOpen(this.props.id)
        this.setState({ inProgress: false , color: 'white'})
    }

    componentDidMount() {
        this.setState({ color: this.props.isOpen ? 'white' : this.props.color })
    }

    render() {
        let { value } = this.props
        let opacity = this.props.isActive ? 'brightness(.5)' : 'brightness(.3)';
        let activeBorder = '1px solid white'
        let activeCursor = 'default'
        let activeBox = 'initial'
        let box = 'none'
        if(this.props.isActive && !this.props.isOpen) {
            activeBorder = '1px solid magenta'
            activeCursor = 'pointer'
            // activeBorder = '2px solid ' + this.props.color;
        }
        if(this.props.isOpen) {
            opacity = 'none'
        }

        const colorValue = {
            background: this.state.color,
            filter: opacity,
            // border: activeBorder,
            cursor: activeCursor,
        }

        return(
            <td style={colorValue} onClick={this.handleClick} className={"Tile"}>{value}</td>
        )
    }
}
export default Tile;