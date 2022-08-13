import p5 from "p5";

import "./style.css";

const distance = [] as number[];
new p5((p5Instance: p5) => {
  const p = p5Instance;

  const scale: number = 10;

  p.setup = function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.angleMode(this.DEGREES);
  };

  let loc = p.createVector(0, 0);

  p.draw = function draw() {
    let locPrev = loc.copy();
    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    let angleOfPoint = p.atan2(loc.y, loc.x);
    let choice = randomWalk(p);
    loc.add(choice.mult(scale));
    p.stroke(p.map(angleOfPoint, -180, 180, 0, 255), 100, 180, 100);
    p.strokeWeight(5);
    p.line(locPrev.x, locPrev.y, loc.x, loc.y);
    distance.push(p.dist(loc.x, loc.y, 0, 0));
    console.log({
      avg: distance.reduce((a, b) => a + b) / distance.length,
      max: Math.max(...distance),
      noOfSteps: distance.length,
    });
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
