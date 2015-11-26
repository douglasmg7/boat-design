$(document).ready(function () {
  updateScale();
});

function updateScale () {
  // calculate the scale from scale factor
  var value;
  $('td:nth-of-type(2) > sup').each(function () {
    value = Math.pow($('#scale-factor').val(), parseFloat($(this).html()));
    $(this).parent().next().html(value.toFixed(2));
  });
}
