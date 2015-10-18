// Javascript Code goes here
$(document).ready(function() {
  Webcam.attach( '#my_camera' );

  function take_snapshot() {
      Webcam.snap( function(data_uri) {
          document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
      } );
  }

});
