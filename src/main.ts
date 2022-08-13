import p5 from "p5";

import "./style.css";

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
    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    let angleOfPoint = p.atan2(loc.y, loc.x);
    console.log({ angleOfPoint });
    let choice = randomWalk(p);
    loc.add(choice.mult(scale / 2));
    p.stroke(p.map(angleOfPoint, -180, 180, 0, 255), 100, 180, 100);
    p.strokeWeight(scale / 2);
    p.point(loc.x, loc.y, scale / 2);
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
