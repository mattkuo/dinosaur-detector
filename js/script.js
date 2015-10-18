$(document).ready(function() {
  var firebaseRef = 'https://safe-dinosaur.firebaseio.com/';
  var players = new Firebase(firebaseRef + '/playerboard');
  var ref = new Firebase(firebaseRef);
  var twitter, uid;

  // ref.authAnonymously(function(error, authData) {
  ref.authWithOAuthPopup('twitter', function(error, authData) {
    if (error) return console.log('Login Failed: ', error);
    console.log(authData);
    twitter = authData.twitter;
    uid = authData.uid;
    init();
  }, {
    remember: 'sessionOnly'
  });

  function init() {
    Webcam.attach( '#my-camera' );
    console.log(twitter);
    console.log(uid);
    players.push({uid: uid, twitter: twitter.user });

    connectedRef.on("value", function(isOnline) {
   if (isOnline.val()) {
     // If we lose our internet connection, we want ourselves removed from the list.
     players.onDisconnect().remove();

     // Set our initial online status.
   }
   else {

     // We need to catch anytime we are marked as offline and then set the correct status. We
     // could be marked as offline 1 on page load or 2 when we lose our internet connection
     // temporarily.
     players.remove();  
    }
 });



    addPlayers();
    $('.snapshot').click(takeSnapshot);
  }

  function addPlayers() {
    players.orderByChild('score').on('child_added', function(snapshot) {
      console.log(snapshot);
    });
  }

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


});
