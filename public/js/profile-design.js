var xmlns = "http://www.w3.org/2000/svg";

var canvas_width = 800;
var canvas_height = 500;
var canvas_scale = .2;

var svgDoc;
var selectedPoint = 0;
var control_point;
var dx = 0;
var dy = 0;

var example_shape;
var text_variables;
var control_lines;
var coords = [0, 0, 100, 100, 150, 20, 180, 150, 280, 100];

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

// draw profile points
function drawProfilePoints() {
  var $svg = $('svg');
  var $g = $(document.createElementNS(xmlns, 'g'))
              .attr('transform', 'scale(' + canvas_scale +',' + canvas_scale + ')')
              .appendTo($svg);
  var circle;
  // strakes
  for (var prop in tableOffset.height) {
    if (tableOffset.height.hasOwnProperty(prop)) {
      // x position
      tableOffset.positions.forEach(function (value, index) {
        circle = document.createElementNS(xmlns, 'circle');
        $(circle)
          .attr({'cx': value, 'cy': tableOffset.height[prop][index], 'r': 2/canvas_scale})
          .appendTo($g);
      });
    }
  }
}

function init(evt) {
    // console.log(evt);
    if ( window.svgDocument == null ) {
      svgDoc = evt.target.ownerDocument;
    }
    // canvas dimension
    $(evt.target).attr({'width': canvas_width, 'height': canvas_height});
    $('#canvas_border').attr({'width': canvas_width-1, 'height': canvas_height-1});

    example_shape = svgDoc.getElementById('example_shape');
    controls_lines = [svgDoc.getElementById('control_line1'),
                      svgDoc.getElementById('control_line2')] ;
    text_variables = [];
    for (var i=1; i<=4; i++){
        text_variables.push(svgDoc.getElementById('variable'+i));
    }

    drawProfilePoints();
};

function selectElement(evt, point) {
  selectedPoint = point;
  control_point = evt.target.parentNode;
  dx = coords[selectedPoint*2] - evt.clientX;
  dy = coords[selectedPoint*2 + 1] - evt.clientY;
}

function drag(evt){
    if (selectedPoint === 0) { return; }
    var x = evt.clientX + dx;
    var y = evt.clientY + dy;
    coords[selectedPoint*2] = x;
    coords[selectedPoint*2 + 1] = y;

    var d = "M";
    for (var i=2; i<coords.length; i+=2){
        if (i === 4) { d += "C"; }
        d += " " + coords[i] + " " + coords[i+1];
    }
    example_shape.setAttributeNS(null, "d", d);
    control_point.setAttributeNS(null, "transform", "translate(" + x + "," + y + ")");
    text_variables[selectedPoint-1].firstChild.data = x + "," + y;

    // Control lines
    var n = Math.floor(selectedPoint/3);
    var i = (selectedPoint % 2) + 1;
    controls_lines[n].setAttributeNS(null, "x"+i, x);
    controls_lines[n].setAttributeNS(null, "y"+i, y);
};

function deselect(){
    selectedPoint = 0;
}

function req_button() {
  console.log('clicou');
  $.ajax({
    url:'/ajax-response',
    data: {req: 1},
    type: 'GET',
    dataType: 'html',
    success: function (data) {
      console.log('Response: ' + data);
    },
    error: function (xhr, status, errorThrown) {
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    }
  });
}
