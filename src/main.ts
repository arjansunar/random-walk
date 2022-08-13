import p5 from "p5";

import "./style.css";

new p5((p5Instance: p5) => {
  const p = p5Instance;

  const scale: number = 10;

  p.setup = function setup() {
    p.createCanvas(500, 500);
    p.background(0);
  };

  let x = 250;
  let y = 250;
  p.draw = function draw() {
    let choice = randomWalk(p);

    p.fill(220, 0, 0, 100);
    p.ellipse(x, y, scale / 2);

    x = x + choice.x * scale;
    y = y + choice.y * scale;
  };
}, document.getElementById("app")!);

const randomWalk = (p5: p5) => {
  const choices = [
    { x: 0, y: 1 }, // up
    { x: 0, y: -1 }, // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }, // right
  ];
  const choice = p5.floor(p5.random(4));
  return choices[choice];
};
