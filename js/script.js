// Javascript Code goes here
$(document).ready(function() {
  Webcam.attach( '#my-camera' );

  $('.snapshot').click(takeSnapshot);

  function takeSnapshot() {
      Webcam.snap( function(dataUri) {
          $('#my-result').append('<img src="'+dataUri+'"/>');
      } );
  }

  // Create a connection to your Firebase database
var ref = new Firebase("https://safe-dinosaur.firebaseio.com");

// Save data
ref.set({ name: "Alex Wolf" });

// Listen for realtime changes
ref.on("value", function(data) {
  var name = data.val().name;
});

});
