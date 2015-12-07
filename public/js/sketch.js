function setup() {
  createCanvas(1000, 400);
  // stroke(0);
  // fill(150);
  strokeWeight(1.5);
  stroke(255);
  noFill();
  noLoop();
}

function draw() {
  // background(255);
  // rect(50,50,75,100);

  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(mouseX, mouseY, 80, 80);

  background(0);
  // bezier(20, 200, 410, 300, 440, 300, 780, 200);
  // stroke(255, 102, 0);
  // curve(5, 300, 5, 26, 73, 24, 73, 61);
  // stroke(255);
  // curve(5, 26, 73, 24, 73, 61, 15, 65);


  // var p1 = {x:483/4 , y: 435/4};
  // var p2 = {x:965/4 , y: 362/4};
  // var p3 = {x:1803/4 , y: 305/4};
  // var p4 = {x:2642/4 , y: 308/4};
  // var p5 = {x:3378/4 , y: 362/4};

  var p1 = {x:483/4 , y: 435/4};
  var p2 = {x:965/4 , y: 362/4};
  var p3 = {x:1803/4 , y: 305/4};
  var p4 = {x:2642/4 , y: 308/4};
  var p5 = {x:3378/4 , y: 362/4};

  strokeWeight(6);
  point(p1.x, p1.y);
  point(p2.x, p2.y);
  point(p3.x, p3.y);
  point(p4.x, p4.y);
  point(p5.x, p5.y);

  ellipseMode(CENTER);
  steps = 6;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = curvePoint(p1.x, p1.x, p2.x, p2.x, t);
    y = curvePoint(p1.y, p1.y, p2.y, p2.y, t);
    ellipse(x, y, 1, 1);
  }

  strokeWeight(1.5);
  smooth();
  beginShape();
  curveVertex(p1.x, p1.y);
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p3.x, p3.y);
  curveVertex(p4.x, p4.y);
  curveVertex(p5.x, p5.y);
  curveVertex(p5.x, p5.y);
  // curveVertex(p5.x, p5.y);
  endShape();


}
