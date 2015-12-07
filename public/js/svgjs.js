$(document).ready(function () {
  draw();
});

function draw () {
  // if (SVG.supported) {
  //   var paper = SVG('paper').size('100%', '100%');
  //   // rect = paper.rect(100, 100).attr({ fill: '#f06' });
  //   // line = paper.line(0, 0, 300, 450).stroke({ width: 3 });
  //   var path = paper.path('M 100 200 C 200 100 300  0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100');
  //   path.attr({fill: none});
  // } else {
  //   alert('SVG not supported');
  // }

  var test = SVG.get('#test');
  rect = test.rect(100, 100).attr({ fill: '#f06' });

  // x = test.path("M 120 108 R 140 120 150 130");
  // x.attr({ fill: 'blue' });
}
