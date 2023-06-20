import { calcMovesExecuter } from "./controller";

const createAllGameboardSpot = (grid, movesAry) => {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  for (let k = 0; k < 10; k++) {
    let emty = document.createElement("div");
    grid.appendChild(emty);
  }
  let clickedSpots = 0;
  if (movesAry != undefined) {
    for (let i = 1; i < 9; i++) {
      let num = document.createElement("div");
      num.textContent = i;
      num.classList.add("sideNum");
      grid.appendChild(num);
      for (let j = 1; j < 9; j++) {
        let spot = document.createElement("div");
        if ((j + i) % 2 == 0) {
          spot.classList.add("evenSpot", "spot");
        } else {
          spot.classList.add("oddSpot", "spot");
        }
        if (
          (movesAry[0][0] == j && movesAry[0][1] == i) ||
          (movesAry[movesAry.length - 1][0] == j &&
            movesAry[movesAry.length - 1][1] == i)
        ) {
          spot.classList.add("selctedSpot");
        }
        let round = 0;
        movesAry.forEach((mov) => {
          if (mov[0] == j && mov[1] == i) {
            console.log(round, mov);
            setTimeout(() => {
              spot.classList.add("nextMoveSpot");
            }, round * 1000);
          }
          round++;
        });
        spot.addEventListener("mousedown", () => {
          createAllGameboardSpot(grid);
        });
        grid.appendChild(spot);
      }
      let emty = document.createElement("div");
      grid.appendChild(emty);
    }
  } else {
    for (let i = 1; i < 9; i++) {
      let num = document.createElement("div");
      num.textContent = i;
      num.classList.add("sideNum");
      grid.appendChild(num);
      for (let j = 1; j < 9; j++) {
        let spot = document.createElement("div");
        if ((j + i) % 2 == 0) {
          spot.classList.add("evenSpot", "spot");
        } else {
          spot.classList.add("oddSpot", "spot");
        }
        let clicked = 0;

        spot.addEventListener("click", () => {
          if (clicked % 2 == 0 && clickedSpots < 2) {
            spot.classList.add("selctedSpot");
            clickedSpots++;
            clicked++;
          } else if (clicked % 2 != 0) {
            spot.classList.remove("selctedSpot");
            clickedSpots--;
            clicked--;
          }
          calcMovesExecuter([j, i]);
        });
        grid.appendChild(spot);
      }
      let emty = document.createElement("div");
      grid.appendChild(emty);
    }
  }
  let emty = document.createElement("div");
  let a = document.createElement("div");
  a.classList.add("sideLetter");
  a.textContent = "a";

  let b = document.createElement("div");
  b.classList.add("sideLetter");
  b.textContent = "b";

  let c = document.createElement("div");
  c.classList.add("sideLetter");
  c.textContent = "c";

  let d = document.createElement("div");
  d.classList.add("sideLetter");
  d.textContent = "d";

  let e = document.createElement("div");
  e.classList.add("sideLetter");
  e.textContent = "e";

  let f = document.createElement("div");
  f.classList.add("sideLetter");
  f.textContent = "f";

  let g = document.createElement("div");
  g.classList.add("sideLetter");
  g.textContent = "g";

  let h = document.createElement("div");
  h.classList.add("sideLetter");
  h.textContent = "h";

  grid.appendChild(emty);
  grid.appendChild(a);
  grid.appendChild(b);
  grid.appendChild(c);
  grid.appendChild(d);
  grid.appendChild(e);
  grid.appendChild(f);
  grid.appendChild(g);
  grid.appendChild(h);
};

const createPage = () => {
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");

  const header = document.createElement("span");
  header.classList.add("header");
  header.textContent = "Knight moves claculator";

  const boardgameCon = document.createElement("div");
  boardgameCon.classList.add("boardgameCon");
  createAllGameboardSpot(boardgameCon);

  const calcBtn = document.createElement("button");
  calcBtn.classList.add("calcBtn");
  calcBtn.textContent = "Calculate";

  calcBtn.addEventListener("click", () => {
    let movesAry = calcMovesExecuter();
    createAllGameboardSpot(boardgameCon, movesAry);
  });

  // Appending children
  mainContainer.appendChild(header);
  mainContainer.appendChild(boardgameCon);
  mainContainer.appendChild(calcBtn);

  return mainContainer;
};

document.body.appendChild(createPage());
