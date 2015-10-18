$(document).ready(function() {
  var firebaseRef = 'https://safe-dinosaur.firebaseio.com/';
  var players = new Firebase(firebaseRef + '/playerboard');
  var ref = new Firebase(firebaseRef);
  var twitter, uid;

  var $playerTable = $('#players-table');

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

    var addedPlayer = players.push({uid: uid, username: twitter.username, score: 0 });
    addedPlayer.onDisconnect().remove();
    addPlayerListeners();

    $('.snapshot').click(takeSnapshot);
  }

  // Attach listeners to players
  function addPlayerListeners() {
    players.orderByChild('score');
    players.on('child_added', function(snapshot) {
      var data = snapshot.val();
      console.log(data);
      addPlayerToDom(data.username, data.score);
    });
    players.on('child_removed', function(snapshot) {
      console.log(snapshot);
    });

  }

  // Add player to DOM
  function addPlayerToDom(name, score) {
    var newPlayerRow = $('<tr/>');
    var nameTd = $('<td/>').append($('<em/>').text(name));
    var scoreTd = $('<td/>').text(score);
    newPlayerRow.append(nameTd);
    newPlayerRow.append(scoreTd);
    $playerTable.append(newPlayerRow);
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
