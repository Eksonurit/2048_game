# 2048 Game

A classic implementation of the popular sliding tile puzzle game 2048 built with vanilla JavaScript, HTML5, and CSS3. The application features complete game-state management, matrix transformation algorithms, dynamic DOM manipulation, and responsive controls.

## Live Preview

- [Live Demo](https://Eksonurit.github.io/2048-game/)

## Technologies Used

- JavaScript (ES6+ classes, modules, DOM APIs)
- HTML5
- CSS3 (SCSS / Flexbox / Grid)

## Features

- Fully isolated game engine class (`Game.class.js`) decoupled from UI rendering
- 4x4 matrix representation handling shifts and mergers in four directions
- Strict single-merge-per-turn rules during a single move cycle
- Weighted random generation: new tiles spawn with 90% probability for 2 and 10% probability for 4
- Dynamic score calculation based on merged tile values
- Real-time game status tracking: win condition (reaching 2048) and game-over detection (no valid moves remaining)
- Keyboard navigation using arrow keys
- Interactive state controls: toggle between Start and Restart states

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Eksonurit/2048-game.git
cd 2048-game
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the project locally:

```bash
npm start
# or
yarn start
```

## Architecture and Core API

The project splits domain logic and view handling into two distinct layers:

### `src/modules/Game.class.js`

Encapsulates all calculations and game state checks independently of the browser environment.

- `constructor(initialState)`: Accepts an optional 4x4 matrix or defaults to an empty board.
- `getState()`: Returns the current 4x4 array state.
- `getScore()`: Returns the accumulated score.
- `getStatus()`: Returns one of the active statuses: `'idle'`, `'playing'`, `'win'`, or `'lose'`.
- `moveLeft()`, `moveRight()`, `moveUp()`, `moveDown()`: Shift rows/columns, calculate tile mergers, and spawn a new tile if a state mutation occurred.
- `start()`: Initializes the board with starting tiles.
- `restart()`: Clears the score and board to begin a new round.

### `src/index.html` & `src/scripts/main.js`

Handles UI events, keyboard inputs, CSS modifier bindings (`field-cell--%cell_value%`), and message banner toggles.

## Game Rules

- The playing field is a 4x4 grid.
- Each cell is either empty or contains a power-of-two value (2, 4, 8, ...).
- Tiles slide as far as they can go in the chosen direction until stopped by an edge or another tile.
- Two adjacent tiles with the same value merge into one tile with their sum.
- A merged tile cannot merge again within the same move.
- A valid move requires at least one tile to shift or merge.
- Every successful move spawns a new tile in a random empty cell (90% chance of 2, 10% chance of 4).
- Creating a 2048 tile triggers the victory message.
- The game ends when no valid moves (shifts or merges) remain on the board.

## License

This project is open-source and available under the MIT License.
