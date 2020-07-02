import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';// global css styling 

function Square (props){
  return (
    <button className="square" onClick={props.sqClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      boardStatus : Array(9).fill(null),
      currPlayer : 'X'
    }
  }
  changeBoardState(squareId){
    const status = this.calculateWinner(this.state.boardStatus);
    if(this.state.boardStatus[squareId] || status) return;
    // changing board state
    // const prevState = this.state.boardStatus;
    const newState = this.state.boardStatus.slice();
    newState[squareId] = this.state.currPlayer==='X' ? 'X' : 'O'; 
    // re rendering of board component will happen
    this.setState({boardStatus : newState, currPlayer : this.state.currPlayer==='X' ? 'O' : 'X'});
  }
  renderSquare(squareId) {
    return <Square value={this.state.boardStatus[squareId]} sqClick={() =>{this.changeBoardState(squareId)}} />;
  }
  calculateWinner(squares) {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && (squares[a] === squares[b] && squares[a] === squares[c])) {
        return squares[a];
      }
    }
    return null;

  }

  render() {

    const status = this.calculateWinner(this.state.boardStatus);
    return (
      <div>
        {/* defining status of game */}
        <div className="status">{(status)? status+' is Winner' : 'Next player: '+this.state.currPlayer}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        
        <div className="game-board">
          <Board />
        </div>

        <div className="game-info">

          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>

        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
