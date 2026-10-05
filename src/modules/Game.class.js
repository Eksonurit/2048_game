/* eslint-disable no-undef */
'use strict';

class Game {
  constructor(initialState) {
    this.field = initialState;
    this.score = 0;
    this.status = 'idle';

    if (!initialState) {
      this.field = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }
    this._addRandomTile();
    this._addRandomTile();
  }
  _addRandomTile() {
    const emptyCells = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.field[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const [row, col]
      = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.field[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  moveLeft() {
    const prevField = this.field.map((row) => [...row]);

    for (let i = 0; i < 4; i++) {
      let lastMergePos = -1;
      let pos = 0;

      for (let j = 0; j < 4; j++) {
        if (this.field[i][j] === 0) {
          continue;
        }

        if (
          pos > 0
          && this.field[i][pos - 1] === this.field[i][j]
          && lastMergePos !== pos - 1
        ) {
          this.field[i][pos - 1] *= 2;
          this.score += this.field[i][pos - 1];
          this.field[i][j] = 0;
          lastMergePos = pos - 1;
        } else {
          if (pos !== j) {
            this.field[i][pos] = this.field[i][j];
            this.field[i][j] = 0;
          }
          pos++;
        }
      }
    }

    if (!this._fieldsEqual(prevField, this.field)) {
      this._addRandomTile();
    }
    this._checkLose();
  }
  moveRight() {
    const prevField = this.field.map((row) => [...row]);

    for (let i = 0; i < 4; i++) {
      let lastMergePos = 4;
      let pos = 3;

      for (let j = 3; j >= 0; j--) {
        if (this.field[i][j] === 0) {
          continue;
        }

        if (
          pos < 3
          && this.field[i][pos + 1] === this.field[i][j]
          && lastMergePos !== pos + 1
        ) {
          this.field[i][pos + 1] *= 2;
          this.score += this.field[i][pos + 1];
          this.field[i][j] = 0;
          lastMergePos = pos + 1;
        } else {
          if (pos !== j) {
            this.field[i][pos] = this.field[i][j];
            this.field[i][j] = 0;
          }
          pos--;
        }
      }
    }

    if (!this._fieldsEqual(prevField, this.field)) {
      this._addRandomTile();
    }
    this._checkLose();
  }

  moveUp() {
    const prevField = this.field.map((row) => [...row]);

    for (let j = 0; j < 4; j++) {
      let pos = 0;
      let lastMergePos = 4;

      for (let i = 0; i < 4; i++) {
        if (this.field[i][j] === 0) {
          continue;
        }

        if (
          pos > 0
          && this.field[i][j] === this.field[pos - 1][j]
          && lastMergePos !== pos - 1
        ) {
          this.field[pos - 1][j] *= 2;
          this.score += this.field[pos - 1][j];
          this.field[i][j] = 0;
          lastMergePos = pos - 1;
        } else {
          this.field[pos][j] = this.field[i][j];

          if (pos !== i) {
            this.field[i][j] = 0;
          }
          pos++;
        }
      }
    }

    if (!this._fieldsEqual(prevField, this.field)) {
      this._addRandomTile();
    }
    this._checkLose();
  }
  moveDown() {
    const prevField = this.field.map((row) => [...row]);

    for (let j = 0; j < 4; j++) {
      let pos = 3;
      let lastMergePos = -1;

      for (let i = 3; i >= 0; i--) {
        if (this.field[i][j] === 0) {
          continue;
        }

        if (
          pos + 1 < 4
          && this.field[i][j] === this.field[pos + 1][j]
          && lastMergePos !== pos + 1
        ) {
          this.field[pos + 1][j] *= 2;
          this.score += this.field[pos + 1][j];
          this.field[i][j] = 0;
          lastMergePos = pos + 1;
        } else {
          this.field[pos][j] = this.field[i][j];

          if (pos !== i) {
            this.field[i][j] = 0;
          }
          pos--;
        }
      }
    }

    if (!this._fieldsEqual(prevField, this.field)) {
      this._addRandomTile();
    }
    this._checkLose();
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  getState() {
    return this.field;
  }

  getStatus() {
    return this.status;
  }

  start() {
    if (this.status === 'idle') {
      this.status = 'playing';
    }
  }

  restart() {
    this.field = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this._addRandomTile();
    this._addRandomTile();

    this.score = 0;
    this.status = 'playing';
  }

  _checkLose() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.field[i][j] === 0) {
          return false;
        }

        if (j < 3 && this.field[i][j] === this.field[i][j + 1]) {
          return false;
        }

        if (i < 3 && this.field[i][j] === this.field[i + 1][j]) {
          return false;
        }
      }
    }

    this.status = 'lose';

    return true;
  }
  render({ cells, scoreElement, messageWin, messageLose }) {
    const state = this.getState();

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = cells[i * 4 + j];
        const value = state[i][j];

        cell.textContent = '';
        cell.className = 'field-cell';

        if (value !== 0) {
          cell.textContent = value;
          cell.classList.add(`field-cell--${value}`);
        }
      }
    }

    scoreElement.textContent = this.getScore();

    // eslint-disable-next-line no-shadow
    const status = this.getStatus();

    messageWin.classList.toggle('hidden', status !== 'win');
    messageLose.classList.toggle('hidden', status !== 'lose');
  }

  _fieldsEqual(field1, field2) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (field1[i][j] !== field2[i][j]) {
          return false;
        }
      }
    }

    return true;
  }
}

module.exports = Game;
