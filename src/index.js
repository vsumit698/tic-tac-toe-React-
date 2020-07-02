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
  
  
  renderSquare(squareId) {
    return <Square value={this.props.boardStatus[squareId]} sqClick={()=>{this.props.sqClick(squareId)}} />;
  }
  
  render() {
    return (
      <div>

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

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        boardStatus: Array(9).fill(null),
      }],
      currPlayer: 'X'
    };
  }

  changeBoardStatus(squareId){
    var currBoardState = this.state.history[this.state.history.length-1];

    const status = this.calculateWinner(currBoardState.boardStatus);
  
    if(currBoardState.boardStatus[squareId] || status) return;
    // changing board state
    // const prevState = this.state.boardStatus;
    const newBoardStatus = currBoardState.boardStatus.slice();
    newBoardStatus[squareId] = this.state.currPlayer==='X' ? 'X' : 'O';
    this.state.history.push({boardStatus : newBoardStatus});
    // re rendering of game component will happen
    this.setState({history : this.state.history , currPlayer : this.state.currPlayer==='X' ? 'O' : 'X'});

  }

  calculateWinner(squares) {

    const lines = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && (squares[a] === squares[b] && squares[a] === squares[c])) {
        return squares[a];
      }
    }
    return null;

  }

  render() {
    var currBoardState = this.state.history[this.state.history.length-1];
    
    const status = this.calculateWinner(currBoardState.boardStatus);
    
    return (
      <div className="game">
        
        <div className="game-board">
          <Board boardStatus={currBoardState.boardStatus} sqClick={(squareId)=>{this.changeBoardStatus(squareId)}}/>
        </div>

        <div className="game-info">

          <div>{(status)? status+' is Winner' : 'Next player: '+this.state.currPlayer}</div>
          <ol>{/* TODO */}</ol>

        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game/>, document.getElementById('root'));
