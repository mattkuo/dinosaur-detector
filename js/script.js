// Javascript Code goes here
$(document).ready(function() {
  Webcam.attach( '#my-camera' );

  $('.snapshot').click(takeSnapshot);

  function takeSnapshot() {
      Webcam.snap( function(dataUri) {
          $('#my-result').append('<img src="'+dataUri+'"/>');
      } );
  }

});
