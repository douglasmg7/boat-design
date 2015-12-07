$(document).ready(function () {
  draw();
});

var REF_LINE_STROKE = .75;
var DRAW_LINE = 1;
var SCALE_FACTOR = 4;

// table of offsets (mm)
var tableOffset = {
  positions : [483, 965, 1803, 2642, 3378],
  height : {
    sheer: [435, 362, 305, 308, 362],
    lap1: [327, 240, 167, 181, 262],
    lap2: [187, 90, 16, 41, 124],
    bottom: [0, -70, -114, -71, 19]
  },
  halfBreadth : {
    sheer: [297, 530, 648, 597, 445],
    lap1: [265, 500, 624, 572, 422],
    lap2: [186, 402, 530, 468, 311],
    bottom: [6, 162, 254, 183, 25]
  }
};

// Scale table of offsets
scaleTableOffset(-SCALE_FACTOR);

// Divide table of offsets value by factor
function scaleTableOffset(factor) {
  for (var prop in tableOffset.height) {
    if (tableOffset.height.hasOwnProperty(prop)) {
      tableOffset.height[prop].forEach(function (item, index, array) {
        tableOffset.height[prop][index] = tableOffset.height[prop][index] / factor;
        // console.log(tableOffset.height[prop][index]);
      });
    }
  }
  for (var prop in tableOffset.halfBreadth) {
    if (tableOffset.halfBreadth.hasOwnProperty(prop)) {
      tableOffset.halfBreadth[prop].forEach(function (item, index, array) {
        tableOffset.halfBreadth[prop][index] = tableOffset.halfBreadth[prop][index] / factor;
        // console.log(tableOffset.halfBreadth[prop][index]);
      });
    }
  }
  tableOffset.positions.forEach(function (item, index) {
    tableOffset.positions[index] = tableOffset.positions[index] / factor;
    // console.log(tableOffset.positions[index]);
  })
}

// Draw everything
function draw () {
  // var s = Snap("#test");
  var paper = Snap(1100, 400);
  paper.attr({viewBox: '-1000 -250 1100 400'});

  // design water line
  var dw = paper.path('M5 0 H-900')
            .attr({
              fill: "none",
              stroke: "#000",
              strokeWidth: REF_LINE_STROKE
            });

  // vertical origin
  var v0 = paper.path("M0 5 V-150")
            .attr({
              fill: "none",
              stroke: "#000",
              strokeWidth: REF_LINE_STROKE
            });

  // Profile
  drawProfile();
  drawProfileBow();
  drawStationRef();

  // Draw stations reference lines
  function drawStationRef() {
    var verLines = {};
    tableOffset.positions.forEach(function (item, index) {
      verLines[index] = paper.path('M' + tableOffset.positions[index] + ' 50 V-150')
        .attr({
          fill: "none",
          stroke: lineColor,
          strokeWidth: REF_LINE_STROKE
        });
    })
  }

  // Draw profile lines
  function drawProfile() {
    // line color
    lineColor = "#000";

    var lines = {};
    for (var prop in tableOffset.height) {
      if (tableOffset.height.hasOwnProperty(prop)) {
          lines[prop] = paper.path(
                      'M' + tableOffset.positions[0] + ' ' + tableOffset.height[prop][0] + ' ' +
                      'R' + tableOffset.positions[1] + ' ' + tableOffset.height[prop][1] + ' ' +
                      tableOffset.positions[2] + ' ' + tableOffset.height[prop][2] + ' ' +
                      tableOffset.positions[3] + ' ' + tableOffset.height[prop][3] + ' ' +
                      tableOffset.positions[4] + ' ' + tableOffset.height[prop][4]
                    )
                    .attr({
                      fill: "none",
                      stroke: lineColor,
                      strokeWidth: DRAW_LINE
                    });
      }
    }
  }

  // Draw profile bow
  function drawProfileBow(){
    var bowPoint = paper.circle(tableOffset.positions[0] + 425.45/SCALE_FACTOR , -508/SCALE_FACTOR, 1)
                        .attr({
                          fill: "none",
                          stroke: lineColor,
                          strokeWidth: REF_LINE_STROKE
                        });
  }

  // i = Snap.path.intersection(s1, s2);
  // console.log(i[0].x);
  // console.log(i[0].y);
  //
  // len = s2.getTotalLength();
  // console.log(len);
}
