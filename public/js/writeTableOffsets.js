$(document).ready(function () {
  // false = inch
  var SHOW_UNIT = 'mm';
  var READ_UNIT = offsets.unit;

  // log
  var log = $('<h2>');
  // log.html(offsets.positionsName[0]);

  // table
  var table = $('<table>');
  var caption = $('<caption>').html(offsets.name.toUpperCase() + ' - TABLE OF OFFSETS (' + SHOW_UNIT + ')');
  table.append(caption);

  // table head
  var thead = $('<thead>');
  thead.appendTo(table);
  var tr = $('<tr>');
  tr.appendTo(thead);
  $('<th>').attr({'scope':'col', 'colspan':2, 'class':'over-head'}).appendTo(tr);
  offsets.positions.forEach(function (item, index, array) {
    $('<th>').html(offsets.positionsName[index] + ' (' + convert(READ_UNIT, SHOW_UNIT, item) + ')').attr({'scope':'col'}).appendTo(tr);
  });

  // heights and half-breadth
  var firstLoop;
  ['heights', 'half-breadth'].forEach(function (item, index, array) {
    tr = $('<tr>');
    tr.appendTo(table);
    $('<th>').html(item).attr({'rowspan':offsets.strakes.length, 'class':'head'}).appendTo(tr);
    firstLoop = true;
    // stakes
    offsets.strakes.forEach(function (item2, index2, array2) {
        // create new tr from second loop
        if (!firstLoop) {
          tr = $('<tr>');
          tr.appendTo(table);
        }
        firstLoop = false;
        $('<th>').html(item2).attr({'scope':'row', 'class':'sub-head'}).appendTo(tr);
        // positions
        offsets.positionsName.forEach(function (item3, index3, array3) {
          // exist position defined
          if ((offsets[item][item2]) && (offsets[item][item2][item3])) {
            $('<td>').html(convert(READ_UNIT, SHOW_UNIT, offsets[item][item2][item3])).appendTo(tr);
          }
          else {
            $('<td>').appendTo(tr);
          }
        });
    });
  });

  $('#content').append(log);
  $('#content').append(table);



  // convert unit from in to out
  function convert(readUnit, showUnit, value) {
    // unit to show
    if (((readUnit == 'mm') && (showUnit == 'mm')) || ((readUnit == 'inch') && (showUnit == 'inch'))) {
        return value;
    }
    else if ((readUnit == 'inch') && (showUnit == 'mm')) {
        return inchToMm(value);
    }
    else if ((readUnit == 'mm') && (showUnit == 'inch')) {
        // todo
        return 0;
    }
  }

  // convert inch to mm
  // parameter is a string "7 3/8" or "1/4"
  // return a roundend mm in a string formated
  function inchToMm(value) {
    if (value === 0) {
      return 0;
    }

    // convert to positive values, but turn them negative again in the end
    var negative = false;
    if (value.charAt(0) === '-') {
      negative = true;
      value = value.slice(1);
    }

    // convert inch fraction to mm
    value = value.split(" ");
    // first part
    value[0] = value[0].split("/");
    // fractional inch
    if (value[0][1]) {
      value = parseInt(value[0][0]) / parseInt(value[0][1]);
    // second part exist
    }  else {
      // fractional inch
      if (value[1]) {
        value[1] = value[1].split("/");
        if (value[1]) {
            value[1] = parseInt(value[1][0]) / parseInt(value[1][1]);
        }
        value = parseInt(value[0]) + value[1];
      }
    }
    // convert to mm
    value *= 25.4;
    value = Math.round(value);
    // convert to original sign
    if (negative) {
      value = -value;
    }
    return value.toString();
  }
});
