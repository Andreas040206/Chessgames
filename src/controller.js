import calcMoves from "./moveCal";

let fromSpot;
let toSpot;

const calcMovesExecuter = (spot) => {
  if (spot == undefined) {
    if (fromSpot != undefined && toSpot != undefined) {
      let movesAry = calcMoves(fromSpot, toSpot);
      fromSpot = undefined;
      toSpot = undefined;
      return movesAry;
    }
  } else {
    if (fromSpot == undefined) {
      fromSpot = spot;
    } else if (fromSpot[0] == spot[0] && fromSpot[1] == spot[1]) {
      if (toSpot != undefined) {
        fromSpot = toSpot;
        toSpot = undefined;
      } else {
        fromSpot = undefined;
      }
    } else if (toSpot == undefined) {
      toSpot = spot;
    } else if (toSpot[0] == spot[0] && toSpot[1] == spot[1]) {
      toSpot = undefined;
    }
  }
};

export { calcMovesExecuter };
