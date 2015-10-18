// Javascript Code goes here
$(document).ready(function() {
  var firebaseRef = 'https://safe-dinosaur.firebaseio.com/';
  Webcam.attach( '#my-camera' );

  $('.snapshot').click(takeSnapshot);

  function takeSnapshot() {
      // Webcam.snap(function(dataUri) {
      //     var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(dataUri));
      //     var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
      //     f.set(dataUri, function(isError) {
      //       if (isError === undefined) return;
      //       console.log('success');
      //       window.location.hash = hash;
      //       $('#my-result').append('<img src="'+dataUri+'"/>');
      //     });
      // } );
      Webcam.snap(function(dataUri) {
        var rawImage = encodeURIComponent(dataUri.replace(/^data\:image\/\w+\;base64\,/, ''));
        $.ajax({
          type: 'POST',
          url: 'https://api.clarifai.com/v1/tag/',
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer T01MKAlG9DySvJGuNw33jscBeOqQzC'
          },
          data: 'encoded_data=' + rawImage
        })
        .done(function(data) {
          console.log(data.results[0].result.tag.classes);
        });
      });


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
