/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcMovesExecuter: () => (/* binding */ calcMovesExecuter)
/* harmony export */ });
/* harmony import */ var _moveCal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveCal */ "./src/moveCal.js");


let fromSpot;
let toSpot;

const calcMovesExecuter = (spot) => {
  if (spot == undefined) {
    if (fromSpot != undefined && toSpot != undefined) {
      let movesAry = (0,_moveCal__WEBPACK_IMPORTED_MODULE_0__["default"])(fromSpot, toSpot);
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




/***/ }),

/***/ "./src/domStuff.js":
/*!*************************!*\
  !*** ./src/domStuff.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");


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
          (0,_controller__WEBPACK_IMPORTED_MODULE_0__.calcMovesExecuter)([j, i]);
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
    let movesAry = (0,_controller__WEBPACK_IMPORTED_MODULE_0__.calcMovesExecuter)();
    createAllGameboardSpot(boardgameCon, movesAry);
  });

  // Appending children
  mainContainer.appendChild(header);
  mainContainer.appendChild(boardgameCon);
  mainContainer.appendChild(calcBtn);

  return mainContainer;
};

document.body.appendChild(createPage());


/***/ }),

/***/ "./src/moveCal.js":
/*!************************!*\
  !*** ./src/moveCal.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcMoves);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!**************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  margin: 0px;\n  font-family: \"Times New Roman\", Times, serif;\n}\n\n.mainContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 100px;\n}\n\n.header {\n  font-size: 50px;\n  text-align: center;\n  font-weight: bold;\n}\n\n.boardgameCon {\n  display: grid;\n  height: min(600px, 90vw);\n  width: min(600px, 90vw);\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.sideNum {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-right: 18px;\n  font-size: min(40px, 5vw);\n  font-weight: 700;\n}\n\n.sideLetter {\n  display: flex;\n  justify-content: center;\n  padding-top: 4px;\n  font-size: min(40px, 5vw);\n  font-weight: 700;\n}\n\n.spot {\n  transition: 0.2s;\n}\n\n.evenSpot {\n  background-color: rgb(204, 204, 204);\n}\n\n.evenSpot:hover {\n  background-color: #9bcef8;\n}\n\n.oddSpot {\n  background-color: rgb(50, 50, 50);\n}\n\n.oddSpot:hover {\n  background-color: #5b92bf;\n}\n\n.selctedSpot {\n  background-color: #54adf5;\n}\n\n.selctedSpot:hover {\n  background-color: #54adf5;\n}\n\n.nextMoveSpot {\n  background-color: #54f587;\n}\n\n.calcBtn {\n  margin-top: 30px;\n  height: 70px;\n  width: 220px;\n  font-size: 30px;\n  border-radius: 0px;\n  border: none;\n  background-color: rgb(50, 50, 50);\n  color: white;\n  transition: 0.2s;\n}\n\n.calcBtn:hover {\n  scale: 1.05;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,4CAA4C;AAC9C;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,wBAAwB;EACxB,uBAAuB;EACvB,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;EAChB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,iCAAiC;EACjC,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb","sourcesContent":["body {\n  margin: 0px;\n  font-family: \"Times New Roman\", Times, serif;\n}\n\n.mainContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 100px;\n}\n\n.header {\n  font-size: 50px;\n  text-align: center;\n  font-weight: bold;\n}\n\n.boardgameCon {\n  display: grid;\n  height: min(600px, 90vw);\n  width: min(600px, 90vw);\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.sideNum {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-right: 18px;\n  font-size: min(40px, 5vw);\n  font-weight: 700;\n}\n\n.sideLetter {\n  display: flex;\n  justify-content: center;\n  padding-top: 4px;\n  font-size: min(40px, 5vw);\n  font-weight: 700;\n}\n\n.spot {\n  transition: 0.2s;\n}\n\n.evenSpot {\n  background-color: rgb(204, 204, 204);\n}\n\n.evenSpot:hover {\n  background-color: #9bcef8;\n}\n\n.oddSpot {\n  background-color: rgb(50, 50, 50);\n}\n\n.oddSpot:hover {\n  background-color: #5b92bf;\n}\n\n.selctedSpot {\n  background-color: #54adf5;\n}\n\n.selctedSpot:hover {\n  background-color: #54adf5;\n}\n\n.nextMoveSpot {\n  background-color: #54f587;\n}\n\n.calcBtn {\n  margin-top: 30px;\n  height: 70px;\n  width: 220px;\n  font-size: 30px;\n  border-radius: 0px;\n  border: none;\n  background-color: rgb(50, 50, 50);\n  color: white;\n  transition: 0.2s;\n}\n\n.calcBtn:hover {\n  scale: 1.05;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "../node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moveCal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveCal */ "./src/moveCal.js");
/* harmony import */ var _domStuff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domStuff */ "./src/domStuff.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7O0FDQW1CO0FBQ0M7QUFDQztBQUNJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2RvbVN0dWZmLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb3ZlQ2FsLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9zdHlsZS5jc3M/Y2I0MCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2FsY01vdmVzIGZyb20gXCIuL21vdmVDYWxcIjtcblxubGV0IGZyb21TcG90O1xubGV0IHRvU3BvdDtcblxuY29uc3QgY2FsY01vdmVzRXhlY3V0ZXIgPSAoc3BvdCkgPT4ge1xuICBpZiAoc3BvdCA9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZnJvbVNwb3QgIT0gdW5kZWZpbmVkICYmIHRvU3BvdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBtb3Zlc0FyeSA9IGNhbGNNb3Zlcyhmcm9tU3BvdCwgdG9TcG90KTtcbiAgICAgIGZyb21TcG90ID0gdW5kZWZpbmVkO1xuICAgICAgdG9TcG90ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIG1vdmVzQXJ5O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZnJvbVNwb3QgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmcm9tU3BvdCA9IHNwb3Q7XG4gICAgfSBlbHNlIGlmIChmcm9tU3BvdFswXSA9PSBzcG90WzBdICYmIGZyb21TcG90WzFdID09IHNwb3RbMV0pIHtcbiAgICAgIGlmICh0b1Nwb3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZyb21TcG90ID0gdG9TcG90O1xuICAgICAgICB0b1Nwb3QgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcm9tU3BvdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRvU3BvdCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRvU3BvdCA9IHNwb3Q7XG4gICAgfSBlbHNlIGlmICh0b1Nwb3RbMF0gPT0gc3BvdFswXSAmJiB0b1Nwb3RbMV0gPT0gc3BvdFsxXSkge1xuICAgICAgdG9TcG90ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgY2FsY01vdmVzRXhlY3V0ZXIgfTtcbiIsImltcG9ydCB7IGNhbGNNb3Zlc0V4ZWN1dGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5jb25zdCBjcmVhdGVBbGxHYW1lYm9hcmRTcG90ID0gKGdyaWQsIG1vdmVzQXJ5KSA9PiB7XG4gIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHtcbiAgICBncmlkLnJlbW92ZUNoaWxkKGdyaWQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBmb3IgKGxldCBrID0gMDsgayA8IDEwOyBrKyspIHtcbiAgICBsZXQgZW10eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChlbXR5KTtcbiAgfVxuICBsZXQgY2xpY2tlZFNwb3RzID0gMDtcbiAgaWYgKG1vdmVzQXJ5ICE9IHVuZGVmaW5lZCkge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgOTsgaSsrKSB7XG4gICAgICBsZXQgbnVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG51bS50ZXh0Q29udGVudCA9IGk7XG4gICAgICBudW0uY2xhc3NMaXN0LmFkZChcInNpZGVOdW1cIik7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKG51bSk7XG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDk7IGorKykge1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGlmICgoaiArIGkpICUgMiA9PSAwKSB7XG4gICAgICAgICAgc3BvdC5jbGFzc0xpc3QuYWRkKFwiZXZlblNwb3RcIiwgXCJzcG90XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwb3QuY2xhc3NMaXN0LmFkZChcIm9kZFNwb3RcIiwgXCJzcG90XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobW92ZXNBcnlbMF1bMF0gPT0gaiAmJiBtb3Zlc0FyeVswXVsxXSA9PSBpKSB8fFxuICAgICAgICAgIChtb3Zlc0FyeVttb3Zlc0FyeS5sZW5ndGggLSAxXVswXSA9PSBqICYmXG4gICAgICAgICAgICBtb3Zlc0FyeVttb3Zlc0FyeS5sZW5ndGggLSAxXVsxXSA9PSBpKVxuICAgICAgICApIHtcbiAgICAgICAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJzZWxjdGVkU3BvdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcm91bmQgPSAwO1xuICAgICAgICBtb3Zlc0FyeS5mb3JFYWNoKChtb3YpID0+IHtcbiAgICAgICAgICBpZiAobW92WzBdID09IGogJiYgbW92WzFdID09IGkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvdW5kLCBtb3YpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHNwb3QuY2xhc3NMaXN0LmFkZChcIm5leHRNb3ZlU3BvdFwiKTtcbiAgICAgICAgICAgIH0sIHJvdW5kICogMTAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvdW5kKys7XG4gICAgICAgIH0pO1xuICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZUFsbEdhbWVib2FyZFNwb3QoZ3JpZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBncmlkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgfVxuICAgICAgbGV0IGVtdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChlbXR5KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA5OyBpKyspIHtcbiAgICAgIGxldCBudW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbnVtLnRleHRDb250ZW50ID0gaTtcbiAgICAgIG51bS5jbGFzc0xpc3QuYWRkKFwic2lkZU51bVwiKTtcbiAgICAgIGdyaWQuYXBwZW5kQ2hpbGQobnVtKTtcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgOTsgaisrKSB7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaWYgKChqICsgaSkgJSAyID09IDApIHtcbiAgICAgICAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJldmVuU3BvdFwiLCBcInNwb3RcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BvdC5jbGFzc0xpc3QuYWRkKFwib2RkU3BvdFwiLCBcInNwb3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsaWNrZWQgPSAwO1xuXG4gICAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBpZiAoY2xpY2tlZCAlIDIgPT0gMCAmJiBjbGlja2VkU3BvdHMgPCAyKSB7XG4gICAgICAgICAgICBzcG90LmNsYXNzTGlzdC5hZGQoXCJzZWxjdGVkU3BvdFwiKTtcbiAgICAgICAgICAgIGNsaWNrZWRTcG90cysrO1xuICAgICAgICAgICAgY2xpY2tlZCsrO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2xpY2tlZCAlIDIgIT0gMCkge1xuICAgICAgICAgICAgc3BvdC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsY3RlZFNwb3RcIik7XG4gICAgICAgICAgICBjbGlja2VkU3BvdHMtLTtcbiAgICAgICAgICAgIGNsaWNrZWQtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsY01vdmVzRXhlY3V0ZXIoW2osIGldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICB9XG4gICAgICBsZXQgZW10eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGVtdHkpO1xuICAgIH1cbiAgfVxuICBsZXQgZW10eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYS5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgYS50ZXh0Q29udGVudCA9IFwiYVwiO1xuXG4gIGxldCBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYi5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgYi50ZXh0Q29udGVudCA9IFwiYlwiO1xuXG4gIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYy5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgYy50ZXh0Q29udGVudCA9IFwiY1wiO1xuXG4gIGxldCBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZC5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgZC50ZXh0Q29udGVudCA9IFwiZFwiO1xuXG4gIGxldCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZS5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgZS50ZXh0Q29udGVudCA9IFwiZVwiO1xuXG4gIGxldCBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZi5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgZi50ZXh0Q29udGVudCA9IFwiZlwiO1xuXG4gIGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZy5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgZy50ZXh0Q29udGVudCA9IFwiZ1wiO1xuXG4gIGxldCBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaC5jbGFzc0xpc3QuYWRkKFwic2lkZUxldHRlclwiKTtcbiAgaC50ZXh0Q29udGVudCA9IFwiaFwiO1xuXG4gIGdyaWQuYXBwZW5kQ2hpbGQoZW10eSk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoYSk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoYik7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoYyk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoZCk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoZSk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoZik7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoZyk7XG4gIGdyaWQuYXBwZW5kQ2hpbGQoaCk7XG59O1xuXG5jb25zdCBjcmVhdGVQYWdlID0gKCkgPT4ge1xuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWFpbkNvbnRhaW5lclwiKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiS25pZ2h0IG1vdmVzIGNsYWN1bGF0b3JcIjtcblxuICBjb25zdCBib2FyZGdhbWVDb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZGdhbWVDb24uY2xhc3NMaXN0LmFkZChcImJvYXJkZ2FtZUNvblwiKTtcbiAgY3JlYXRlQWxsR2FtZWJvYXJkU3BvdChib2FyZGdhbWVDb24pO1xuXG4gIGNvbnN0IGNhbGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjYWxjQnRuLmNsYXNzTGlzdC5hZGQoXCJjYWxjQnRuXCIpO1xuICBjYWxjQnRuLnRleHRDb250ZW50ID0gXCJDYWxjdWxhdGVcIjtcblxuICBjYWxjQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbGV0IG1vdmVzQXJ5ID0gY2FsY01vdmVzRXhlY3V0ZXIoKTtcbiAgICBjcmVhdGVBbGxHYW1lYm9hcmRTcG90KGJvYXJkZ2FtZUNvbiwgbW92ZXNBcnkpO1xuICB9KTtcblxuICAvLyBBcHBlbmRpbmcgY2hpbGRyZW5cbiAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkZ2FtZUNvbik7XG4gIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY2FsY0J0bik7XG5cbiAgcmV0dXJuIG1haW5Db250YWluZXI7XG59O1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZVBhZ2UoKSk7XG4iLCJjbGFzcyBtb3ZlIHtcbiAgY29uc3RydWN0b3IoW3gsIHldLCBjdXJyZW50LCBwcmV2KSB7XG4gICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50O1xuICAgIGxldCB0bXAgPSBmaW5kU2hvcnRlc3QoW3gsIHldLCB0aGlzKTtcbiAgICB0bXAudW5zaGlmdChjdXJyZW50KTtcbiAgICB0aGlzLmZhc3Rlc3RNb3ZlcyA9IHRtcDtcbiAgfVxufVxuXG5jb25zdCBwb3NpYmxlTW92ZXNDYWwgPSAoW3gsIHldKSA9PiB7XG4gIC8vIENhbGN1bGF0ZSBhbGwgcG9zaWJsZSBtb3Zlc1xuICBsZXQgbW92ZXMgPSBbXTtcbiAgaWYgKHggLSAyID4gMCkge1xuICAgIGlmICh5IC0gMSA+IDApIHtcbiAgICAgIG1vdmVzLnB1c2goW3ggLSAyLCB5IC0gMV0pO1xuICAgIH1cbiAgICBpZiAoeSArIDEgPCA5KSB7XG4gICAgICBtb3Zlcy5wdXNoKFt4IC0gMiwgeSArIDFdKTtcbiAgICB9XG4gIH1cbiAgaWYgKHggLSAxID4gMCkge1xuICAgIGlmICh5IC0gMiA+IDApIHtcbiAgICAgIG1vdmVzLnB1c2goW3ggLSAxLCB5IC0gMl0pO1xuICAgIH1cbiAgICBpZiAoeSArIDIgPCA5KSB7XG4gICAgICBtb3Zlcy5wdXNoKFt4IC0gMSwgeSArIDJdKTtcbiAgICB9XG4gIH1cbiAgaWYgKHggKyAyIDwgOSkge1xuICAgIGlmICh5IC0gMSA+IDApIHtcbiAgICAgIG1vdmVzLnB1c2goW3ggKyAyLCB5IC0gMV0pO1xuICAgIH1cbiAgICBpZiAoeSArIDEgPCA5KSB7XG4gICAgICBtb3Zlcy5wdXNoKFt4ICsgMiwgeSArIDFdKTtcbiAgICB9XG4gIH1cbiAgaWYgKHggKyAxIDwgOSkge1xuICAgIGlmICh5IC0gMiA+IDApIHtcbiAgICAgIG1vdmVzLnB1c2goW3ggKyAxLCB5IC0gMl0pO1xuICAgIH1cbiAgICBpZiAoeSArIDIgPCA5KSB7XG4gICAgICBtb3Zlcy5wdXNoKFt4ICsgMSwgeSArIDJdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vdmVzO1xufTtcblxuY29uc3QgZmluZFBvc2libGUgPSAodGFyZ2V0LCBwcmV2LCBtb3ZlbnVtYmVyKSA9PiB7XG4gIC8vIFJldHVybiBpZiB3ZSBhcmUgbm90IGFsbG93ZWQgdG8gdGFrZSB0aGlzIG1hbnkgc3RlcHMgeWV0XG4gIGlmIChtb3ZlbnVtYmVyID4gNikgcmV0dXJuO1xuXG4gIC8vIEZpbmRzIGFsbCBwb3NpYmxlIG1vdmVzIHRvIHRlc3RcbiAgbGV0IGFyeSA9IHBvc2libGVNb3Zlc0NhbChwcmV2LmN1cnJlbnQpO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgYXJ5LmZvckVhY2goKG1vdikgPT4ge1xuICAgIC8vIElmIHRoZSBwb3NpYmxlIG1vdmUgaXMgY29ycmVjdCBsZXRzIHJldHVybiBpdHMgc3RlcHNcbiAgICBtb3YuY3VycmVudCA9IFttb3ZbMF0sIG1vdlsxXV07XG4gICAgaWYgKG1vdlswXSA9PSB0YXJnZXRbMF0gJiYgbW92WzFdID09IHRhcmdldFsxXSkge1xuICAgICAgbGV0IG1vdmVzQXJ5ID0gW107XG4gICAgICBtb3Zlc0FyeS5wdXNoKHRhcmdldCk7XG4gICAgICByZXN1bHQgPSBtb3Zlc0FyeTtcbiAgICB9XG4gICAgLy8gSWYgaXQgaXMgbm90IGxldHMgdGVzdCBpdHMgbmV4dCBtb3Zlc1xuICAgIGlmIChmaW5kUG9zaWJsZSh0YXJnZXQsIG1vdiwgbW92ZW51bWJlciArIDEpICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGluZm8gPSBmaW5kUG9zaWJsZSh0YXJnZXQsIG1vdiwgbW92ZW51bWJlciArIDEpO1xuICAgICAgaW5mby51bnNoaWZ0KG1vdi5jdXJyZW50KTtcbiAgICAgIHJlc3VsdCA9IGluZm87XG4gICAgfVxuICB9KTtcblxuICBpZiAocmVzdWx0ICE9IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmNvbnN0IGZpbmRTaG9ydGVzdCA9ICh0YXJnZXQsIHByZXYpID0+IHtcbiAgLy8gQ2hlY2sgdGhlIHNob3J0ZXN0IHBhdGggZmlyc3RcbiAgZm9yIChsZXQgaSA9IDY7IGkgPiAwOyBpLS0pIHtcbiAgICBpZiAoZmluZFBvc2libGUodGFyZ2V0LCBwcmV2LCBpKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmaW5kUG9zaWJsZSh0YXJnZXQsIHByZXYsIGkpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgY2FsY01vdmVzID0gKFt4LCB5XSwgW3gyLCB5Ml0pID0+IHtcbiAgbGV0IHRtcCA9IG5ldyBtb3ZlKFt4MiwgeTJdLCBbeCwgeV0pO1xuXG4gIHJldHVybiB0bXAuZmFzdGVzdE1vdmVzO1xufTtcblxuY29uc29sZS5sb2coY2FsY01vdmVzKFs0LCA0XSwgWzUsIDVdKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGNNb3ZlcztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBtYXJnaW46IDBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgVGltZXMsIHNlcmlmO1xcbn1cXG5cXG4ubWFpbkNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMTAwcHg7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgZm9udC1zaXplOiA1MHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5ib2FyZGdhbWVDb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGhlaWdodDogbWluKDYwMHB4LCA5MHZ3KTtcXG4gIHdpZHRoOiBtaW4oNjAwcHgsIDkwdncpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNpZGVOdW0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1yaWdodDogMThweDtcXG4gIGZvbnQtc2l6ZTogbWluKDQwcHgsIDV2dyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uc2lkZUxldHRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogNHB4O1xcbiAgZm9udC1zaXplOiBtaW4oNDBweCwgNXZ3KTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5zcG90IHtcXG4gIHRyYW5zaXRpb246IDAuMnM7XFxufVxcblxcbi5ldmVuU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjA0LCAyMDQsIDIwNCk7XFxufVxcblxcbi5ldmVuU3BvdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWJjZWY4O1xcbn1cXG5cXG4ub2RkU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTAsIDUwLCA1MCk7XFxufVxcblxcbi5vZGRTcG90OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YjkyYmY7XFxufVxcblxcbi5zZWxjdGVkU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTRhZGY1O1xcbn1cXG5cXG4uc2VsY3RlZFNwb3Q6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU0YWRmNTtcXG59XFxuXFxuLm5leHRNb3ZlU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTRmNTg3O1xcbn1cXG5cXG4uY2FsY0J0biB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgd2lkdGg6IDIyMHB4O1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLCA1MCwgNTApO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdHJhbnNpdGlvbjogMC4ycztcXG59XFxuXFxuLmNhbGNCdG46aG92ZXIge1xcbiAgc2NhbGU6IDEuMDU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxXQUFXO0VBQ1gsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isd0JBQXdCO0VBQ3hCLHVCQUF1QjtFQUN2QixzQ0FBc0M7RUFDdEMsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixZQUFZO0VBQ1osZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osaUNBQWlDO0VBQ2pDLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBtYXJnaW46IDBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgVGltZXMsIHNlcmlmO1xcbn1cXG5cXG4ubWFpbkNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMTAwcHg7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgZm9udC1zaXplOiA1MHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5ib2FyZGdhbWVDb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGhlaWdodDogbWluKDYwMHB4LCA5MHZ3KTtcXG4gIHdpZHRoOiBtaW4oNjAwcHgsIDkwdncpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNpZGVOdW0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1yaWdodDogMThweDtcXG4gIGZvbnQtc2l6ZTogbWluKDQwcHgsIDV2dyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uc2lkZUxldHRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogNHB4O1xcbiAgZm9udC1zaXplOiBtaW4oNDBweCwgNXZ3KTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5zcG90IHtcXG4gIHRyYW5zaXRpb246IDAuMnM7XFxufVxcblxcbi5ldmVuU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjA0LCAyMDQsIDIwNCk7XFxufVxcblxcbi5ldmVuU3BvdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWJjZWY4O1xcbn1cXG5cXG4ub2RkU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTAsIDUwLCA1MCk7XFxufVxcblxcbi5vZGRTcG90OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YjkyYmY7XFxufVxcblxcbi5zZWxjdGVkU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTRhZGY1O1xcbn1cXG5cXG4uc2VsY3RlZFNwb3Q6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU0YWRmNTtcXG59XFxuXFxuLm5leHRNb3ZlU3BvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTRmNTg3O1xcbn1cXG5cXG4uY2FsY0J0biB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgd2lkdGg6IDIyMHB4O1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLCA1MCwgNTApO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdHJhbnNpdGlvbjogMC4ycztcXG59XFxuXFxuLmNhbGNCdG46aG92ZXIge1xcbiAgc2NhbGU6IDEuMDU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL21vdmVDYWxcIjtcbmltcG9ydCBcIi4vZG9tU3R1ZmZcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL2NvbnRyb2xsZXIuanNcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==