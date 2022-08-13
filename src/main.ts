import p5 from "p5";

import "./style.css";

const history = {} as { [key: string]: boolean };

new p5((p5Instance: p5) => {
  const p = p5Instance;

  const scale: number = 13;

  p.setup = function setup() {
    p.createCanvas(500, 500);
    p.background(0);
  };

  let loc = p.createVector(250, 250);

  p.draw = function draw() {
    let loc_prev = loc;
    p.fill(220);
    let choice = randomWalk(p);
    loc.add(choice.mult(scale));
    if (!isInHistory(loc)) {
      p.ellipse(loc.x, loc.y, scale / 2);
    } else {
      loc = loc_prev;
    }
    addToHistory(loc);
  };
}, document.getElementById("app")!);

const randomWalk = (p5: p5) => {
  const choices = [
    p5.createVector(0, 1), // up
    p5.createVector(0, -1), // down
    p5.createVector(-1, 0), // left
    p5.createVector(1, 0), // right
  ];
  const choice = p5.floor(p5.random(4));
  return choices[choice];
};

const addToHistory = (loc: p5.Vector) => {
  history[loc.x + "," + loc.y] = true;
};

const isInHistory = (loc: p5.Vector) => {
  try {
    let val = history[loc.x + "," + loc.y];
    if (val) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
