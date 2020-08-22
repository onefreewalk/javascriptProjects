//define things first
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const ScoreDisplay = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')
const width = 10
let nextRandom = 0


//// Setting the arrays up for our game
//The Tetrominoes
const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]

// I coded the following 4 by hand as directed
const zTetromino = [
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1]
]

const tTetromino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2],
  [width, width+1, width+2],
  [1, width, width+1, width*2+1]
]

const oTetromino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
]

const iTetromino = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
]

const theTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino ]

let currentPosition = 4
let currentRotation = 0

// Where to draw the tetrominoes
let random = Math.floor(Math.random()*theTetrominoes.length)
console.log(random);
let current = theTetrominoes[random][0]

//// Drawing with (classlist.add / .remove)
//// Arrow functions and forEach

// drawing tetromino
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}

//undraw the Tetromino
function undraw () {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
  })
}


//// (Interval) and Time
// make the tetromino's fall every interval
timerId = setInterval(moveDown, 500)

//// (keycodes)
// Lets control the game with keycodees
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if(e.keyCode === 39) {
    moveRight()
  } else if(e.keyCode === 38) {
    rotate()
  } else if(e.kayCode === 40) {
    moveDown()
  }

}
document.addEventListener('keyup', control)

// Move Down Function
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  halt()
}

const createRandomCircle = () => {
  let circle = document.createElement("div")
  circle.style = `height:${rand255()}px;width:${rand255()}px;background:${randColor()};border-radius:50%;`
  document.body.append(circle)
}
 
// halt function (.some)

function halt() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // another tetromino falling now
    random = nextRandom
    random = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}

//// using (MODULUS) to define where we are on the grid

// move to the left, but not past the bounds, or past other tetrominoes
function moveLeft() {
  undraw()
  const isAtLeftSide = current.some(index => (currentPosition + index) % width === 0)

  if(!isAtLeftSide) currentPosition -=1

  if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }

  draw()
}

// move right except where bounded or contact with other tetrominoes
function moveRight() {
  undraw()
  const isAtRightSide = current.some(index => (currentPosition + index) % width === width -1)

  if(!isAtRightSide) currentPosition +=1

  if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }

  draw()
}

// rotate the tetrominoes
// (increment)
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) { //when up to 4 go back to 0
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}

// who is showing up next? show them in the mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
// how wide is the mini-grid
const displayWidth = 4
let displayIndex = 0

// the Tetrominoes in default display
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], // l Tet
  [0, displayWidth, displayWidth+1, displayWidth*2+1], // z Tet
  [1, displayWidth, displayWidth+1, displayWidth+2], // t Tet
  [0, 1, displayWidth, displayWidth+1],                   // o Tet
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]        // i Tet
]

// display the next shape
function displayShape() {
  // clear the space of anything before displaying next tetromino
  
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}

