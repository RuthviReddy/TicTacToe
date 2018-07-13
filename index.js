import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

//functional component instead of controlled component
//when the Component has only render function, we can write it as a function instead
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
		//change from yellow syntax/
	);
}

//this was a controlled component
//we changed it into a functional component written above

/*class Square extends React.Component {

  	render() {
	    return (
	      <button className="square" 
	      			onClick= {() => this.props.onClick()}>
	        {this.props.value}
	      </button>
	      //to change from the yellow part of syntax/
	    );
  	}
}*/

class Board extends React.Component {

  	renderSquare(i) {
    	return ( <Square 
    				value={ this.props.squares[i] }
    				onClick={() => this.props.onClick(i)}/>
    				//extra/
    );
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

function winner(squares) {
	const lines = [
		[0,1,2],
		[3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	];
	for(let i = 0; i < lines.length; i++)
	{
		const [ a, b, c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
			stepNumber: 0,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
    	const current = history[history.length - 1];
    	const squares = current.squares.slice();
    	if( winner(squares) || squares[i] ) {
    		return;
    	}
    	squares[i] = this.state.xIsNext ? 'X' : 'O';
    	this.setState({
    		history: history.concat([{
    			squares: squares,
    		}]),
    		xIsNext: !(this.state.xIsNext),
    		stepNumber: history.length,
    	});
	}

	jumpTo(step) {
	    this.setState({
	      stepNumber: step,
	      xIsNext: (step % 2) === 0,
	    });
	  }

  	render() {
  		const history = this.state.history;
  		const current = history[this.state.stepNumber];
  		const win = winner(current.squares);

  		const moves = history.map((step, move) => {
      	const desc = move ?
        	'Go to move #' + move :
        	'Go to game start';
      	return (
        	<li>
          	<button onClick={() => this.jumpTo(move)}>{desc}</button>
        	</li>
      	);
    	});

  		let status;

  		if(win != null) {
  			status = 'Winner: ' + win;
  		} else {
  			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  		}

    	return (
	      <div className="game">
	        <div className="game-board">
	          <Board 
	          		squares = {current.squares}
	          		onClick = {(i) => this.handleClick(i)}
	          	/>
	        </div>

	        <div className="game-info">
	          <div>{ status }</div>
	          <ol>{ moves }</ol>
	        </div>
	      </div>
	    );
    //extra/
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
