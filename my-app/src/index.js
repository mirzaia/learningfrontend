import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// FUNCTIONS
/*
function components are a simpler way to write components that only contain a render method 
and don’t have their own state. Instead of defining a class which extends React.Component, 
we can write a function that takes props as input and returns what should be rendered. 
Function components are less tedious to write than classes, and many components can be expressed 
this way.
*/

function Square(props) {
  return (<button className='square' onClick={props.onClick}>
    {props.value}
  </button>); // SQUARE COMPONENT
}

/* side notes
onClick={() => this.props.onClick()}  --- is for class
onClick={props.onClick} --- is for method
*/



// Keeping the state of all squares in the Board component will allow it to determine the winner in the future.

// CLASS
class Board extends React.Component { // BOARD COMPONENT
   // In JavaScript classes, you need to always call super when defining 
  // the constructor of a subclass. All React component classes that have a constructor 
  // should start with a super(props) call.
  constructor(props){ // constructor
    super(props);
    this.state = {
      squares: Array(9).fill(null), // declare the square array
      xIsNext: true, // To set the first move always with 'x'
    };
  } //To collect data from multiple children, or to have two child components 
  //communicate with each other, you need to declare the shared state in their 
  // parent component instead. The parent component can pass the state back down to the 
  // children by using props; this keeps the child components in sync with each other 
  // and with the parent component.



  renderSquare(i) { // We'll passed down a function from the Board to the Square
    // and We'll have Square call that function when a Square is clicked.
    return (  
    <Square 
      value={ // value is props
        this.state.squares[i]} 
        onClick={() => this.handleClick(i)} // onClick is props 
    />); // read the value from the array above
  } // We passed down this two props from Board to Square

  // Since the Square components no longer maintain state, the Square components receive values 
  // from the Board component and inform the Board component when they’re clicked. 
  // In React terms, the Square components are now controlled components.

// In React, it’s conventional to use on[Event] names for props which represent events 
// and handle[Event] for the methods which handle the events.



// Here's what happen when click the square
handleClick(i) {
  const squares = this.state.squares.slice(); // slice() is called to create a copy of the squares array to modify
  // -instead modifying existing array, because immutability is important
  squares[i] = this.state.xIsNext ? 'X' : 'O'; // Each time a player moves, the xIsNext (which is a boolean) will be flipped
  // to determine which player goes next
  this.setState({
    squares: squares,
  xIsNext: !this.state.xIsNext,});
}



  render() {
    const winner = calculateWinner(this.state.squares); // memanggil method untuk menentukan pemenang
    let status;
    if (winner){ 
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    
    return (
      <div>
        <div className="status">{status}</div>
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



class Game extends React.Component { // GAME COMPONENT
  
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
  <Game />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


function calculateWinner(squares) { // method untuk menentukan pemenang
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// NOTES:

/*
a. Immutable Object 
There are generally two approaches to changing data. The first approach is to mutate the data by 
directly changing the data’s values. The second approach is to replace the data with a new copy which 
has the desired changes.

Data Change with Mutation
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}

Data Change without Mutation
var player = {score: 1, name: 'Jeff'};
var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}
// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};

Benefits of Immutable objects:
- Detecting Changes
Detecting changes in mutable objects is difficult because they are modified directly. 
This detection requires the mutable object to be compared to previous copies of itself 
and the entire object tree to be traversed.
Detecting changes in immutable objects is considerably easier. If the immutable object that is 
being referenced is different than the previous one, then the object has changed.
The end result is the same but by not mutating (or changing the underlying data) directly, 
we gain several benefits described below.

-Complex Features Become Simple
Immutability makes complex features much easier to implement. Later in this tutorial, we will implement 
a “time travel” feature that allows us to review the tic-tac-toe game’s history and “jump back” to 
previous moves. This functionality isn’t specific to games — an ability to undo and redo certain 
actions is a common requirement in applications. Avoiding direct data mutation lets us keep previous 
versions of the game’s history intact, and reuse them later.

-Detecting Changes
Detecting changes in mutable objects is difficult because they are modified directly. 
This detection requires the mutable object to be compared to previous copies of itself and 
the entire object tree to be traversed.
Detecting changes in immutable objects is considerably easier. If the immutable object that is
being referenced is different than the previous one, then the object has changed.

-Determining When to Re-Render in React
The main benefit of immutability is that it helps you build pure components in React. 
Immutable data can easily determine if changes have been made, which helps to determine when 
a component requires re-rendering.
You can learn more about shouldComponentUpdate() and how you can build pure components 
by reading Optimizing Performance.


*/