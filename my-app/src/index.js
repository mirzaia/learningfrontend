import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
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
  /*
  constructor(props){ // constructor
    super(props);
    this.state = {
      squares: Array(9).fill(null), // declare the square array
      xIsNext: true, // To set the first move always with 'x'
    };
   }*/ //To collect data from multiple children, or to have two child components 
  //communicate with each other, you need to declare the shared state in their 
  // parent component instead. The parent component can pass the state back down to the 
  // children by using props; this keeps the child components in sync with each other 
  // and with the parent component. /*



  renderSquare(i) { // We'll passed down a function from the Board to the Square
    // and We'll have Square call that function when a Square is clicked.
    return (  
    <Square 
      value={ // value is props
        this.props.squares[i]} // changed from this.state.square to this.state.props to handle time travel
        onClick={() => this.props.onClick(i)} // onClick is props 
    />); // read the value from the array above
  } // We passed down this two props from Board to Square

  // Since the Square components no longer maintain state, the Square components receive values 
  // from the Board component and inform the Board component when they’re clicked. 
  // In React terms, the Square components are now controlled components.

// In React, it’s conventional to use on[Event] names for props which represent events 
// and handle[Event] for the methods which handle the events.


// TIMETRAVEL: We need to move the handleClick method from the Board component to the Game component.
// Here's what happen when click the square
// We also need to modify handleClick because the Game component’s state is structured differently. 
// Within the Game’s handleClick method, we concatenate new history entries onto history.
/*
handleClick(i) {
  const squares = this.state.squares.slice(); // slice() is called to create a copy of the squares array to modify
  // -instead modifying existing array, because immutability is important
  squares[i] = this.state.xIsNext ? 'X' : 'O'; // Each time a player moves, the xIsNext (which is a boolean) will be flipped
  // to determine which player goes next
  this.setState({
    squares: squares,
  xIsNext: !this.state.xIsNext,});
}
*/


  render() {
    // TIMETRAVEL: We delete this constructor
    /*const winner = calculateWinner(this.state.squares); // memanggil method untuk menentukan pemenang
    let status;
    if (winner){ 
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    */
   // <div className="status">{status}</div>
   // TIMETRAVEL: Since the Game component is now rendering the game’s status, we can remove the corresponding code
   // from the Board’s render method
        
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



class Game extends React.Component { // GAME COMPONENT
  
  // We’ll want the top-level Game component to display a list of past moves. 
  // It will need access to the history to do that, so we will place the history state 
  // in the top-level Game component.
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0, // The stepNumber state we’ve added reflects the move displayed to the user now.
      xIsNext: true,
    }
  }

// TIMETRAVEL: We need to move the handleClick method from the Board component to the Game component.
// Here's what happen when click the square
// We also need to modify handleClick because the Game component’s state is structured differently. 
// Within the Game’s handleClick method, we concatenate new history entries onto history.

// Warning: Each child in an array or iterator should have a unique “key” prop. 
// Check the render method of “Game”.
  handleClick(i) { // This ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now become incorrect.
     const history = this.state.history.slice(0, this.state.stepNumber + 1); 
    const current = history[history.length - 1];
    const squares = current.squares.slice();
  // const squares = this.state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      // we need to update stepNumber by adding stepNumber: history.length as part of the this.setState argument. 
      // This ensures we don’t get stuck showing the same move after a new one has been made.
      xIsNext: !this.state.xIsNext,
    }); // slice() is called to create a copy of the squares array to modify
  // -instead modifying existing array, because immutability is important
}

jumpTo(step){ // jumpTo function
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0, // We also set xIsNext to true if the number that we’re changing stepNumber to is even
  });
}

// push() vs concat() = concat() doesn't mutate the original array

  render() {
    // TIMETRAVEL: We’ll update the Game component’s render function 
    // to use the most recent history entry to determine and display the game’s status:
    const history = this.state.history;
    const current = history[this.state.stepNumber]; // Finally, we will modify the Game component’s render method from always rendering the last move to rendering the currently selected move according to stepNumber:
    const winner = calculateWinner(current.squares);
    
    
    // Showing the Past Moves
    // We learned earlier that React elements are first-class JavaScript objects; 
    // we can pass them around in our applications.
    //  To render multiple items in React, we can use an array of React elements. 
    // Using the map method, we can map our history of moves to React elements representing buttons 
    // on the screen, and display a list of buttons to “jump” to past moves.
    const moves =  history.map((step,move) =>{
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        
      <li key={move}> 
        <button onClick={() => this.jumpTo(move)}>{desc}</button> 
        </li> // onClick handler on button called the this.jumpTo(move) method. 
        );
    
      
    });

    
    
    let status;
    if (winner){
      status = 'Winner: ' + winner;
    }
    else {
      status = 'next player: ' + (this.state.isNext ? 'X' : 'O');  
    }


    return ( // TIMETRAVEL: we need to move the handleClick method from the Board component to the Game component.
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
        </div> 
        <div className="game-info">
          <div>{status}</div>
          <div>{/* status */}</div>
          <ol>{moves}</ol>
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



// TIME TRAVEL
// Adding time travel: Come back to last move
// Because we already implement slice() in square class, we could store all the last move into an array 
// we called the array history

// We’ll want the top-level Game component to display a list of past moves. It will need access to 
// the history to do that, so we will place the history state in the top-level Game component.
/*
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]*/
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


/* side
// ABOUT LIST IN REACT

Warning: Each child in an array or iterator should have a unique “key” prop
Check the render method of “Game”.

When we render a list, React stores some information about each rendered list item. 
When we update a list, React needs to determine what has changed. We could have added, removed, 
re-arranged, or updated the list’s items.

Because React cannot know our intentions, we need to specify a key property for each list item to 
differentiate each list item from its siblings. One option would be to use the strings alexa, ben, 
claudia. If we were displaying data from a database, Alexa, Ben, and Claudia’s database IDs could be used as keys.

When a list is re-rendered, React takes each list item’s key and searches the previous list’s items 
for a matching key. If the current list has a key that didn’t exist before, React creates a component. 

!!! NOTE: If the current list is missing a key that existed in the previous list, React destroys the previous component

If two keys match, the corresponding component is moved. Keys tell React about the identity of each 
component which allows React to maintain state between re-renders. If a component’s key changes, the 
component will be destroyed and re-created with a new state.

key is a special and reserved property in React (along with ref, a more advanced feature). 
When an element is created, React extracts the key property and stores the key directly on the returned element. 

!!! NOTE: Even though key may look like it belongs in props, key cannot be referenced using this.props.key. 

React automatically uses key to decide which components to update. 

!!! Note: A component cannot inquire about its key.

!!! NOTE: It’s strongly recommended that you assign proper keys whenever you build dynamic lists. 
If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list’s items or inserting/removing list items. Explicitly passing key={i} silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


*/