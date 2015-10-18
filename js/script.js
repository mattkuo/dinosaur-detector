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

    players.push({uid: uid, twitter: twitter.username });
    addPlayerListeners();

    $('.snapshot').click(takeSnapshot);
  }

  function addPlayerListeners() {
    players.orderByChild('score');
    players.on('child_added', function(snapshot) {
      console.log(snapshot);
    });
    players.on('child_removed', function(snapshot) {
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
