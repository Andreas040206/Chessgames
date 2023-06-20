class move {
  constructor([x, y], current, prev) {
    this.prev = prev;
    this.current = current;
    let tmp = findShortest([x, y], this);
    tmp.unshift(current);
    this.fastestMoves = tmp;
  }
}

const posibleMovesCal = ([x, y]) => {
  // Calculate all posible moves
  let moves = [];
  if (x - 2 > 0) {
    if (y - 1 > 0) {
      moves.push([x - 2, y - 1]);
    }
    if (y + 1 < 9) {
      moves.push([x - 2, y + 1]);
    }
  }
  if (x - 1 > 0) {
    if (y - 2 > 0) {
      moves.push([x - 1, y - 2]);
    }
    if (y + 2 < 9) {
      moves.push([x - 1, y + 2]);
    }
  }
  if (x + 2 < 9) {
    if (y - 1 > 0) {
      moves.push([x + 2, y - 1]);
    }
    if (y + 1 < 9) {
      moves.push([x + 2, y + 1]);
    }
  }
  if (x + 1 < 9) {
    if (y - 2 > 0) {
      moves.push([x + 1, y - 2]);
    }
    if (y + 2 < 9) {
      moves.push([x + 1, y + 2]);
    }
  }
  return moves;
};

const findPosible = (target, prev, movenumber) => {
  // Return if we are not allowed to take this many steps yet
  if (movenumber > 6) return;

  // Finds all posible moves to test
  let ary = posibleMovesCal(prev.current);

  let result;

  ary.forEach((mov) => {
    // If the posible move is correct lets return its steps
    mov.current = [mov[0], mov[1]];
    if (mov[0] == target[0] && mov[1] == target[1]) {
      let movesAry = [];
      movesAry.push(target);
      result = movesAry;
    }
    // If it is not lets test its next moves
    if (findPosible(target, mov, movenumber + 1) != undefined) {
      let info = findPosible(target, mov, movenumber + 1);
      info.unshift(mov.current);
      result = info;
    }
  });

  if (result != undefined) {
    return result;
  }
};

const findShortest = (target, prev) => {
  // Check the shortest path first
  for (let i = 6; i > 0; i--) {
    if (findPosible(target, prev, i) != undefined) {
      return findPosible(target, prev, i);
    }
  }
};

const calcMoves = ([x, y], [x2, y2]) => {
  let tmp = new move([x2, y2], [x, y]);

  return tmp.fastestMoves;
};

console.log(calcMoves([4, 4], [5, 5]));

export default calcMoves;
