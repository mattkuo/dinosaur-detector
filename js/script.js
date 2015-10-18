$(document).ready(function() {
  var firebaseRef = 'https://safe-dinosaur.firebaseio.com/';
  var players = new Firebase(firebaseRef + '/playerboard');
  var ref = new Firebase(firebaseRef);
  var gamestate = new Firebase(firebaseRef + '/gamestate');
  var htmlForPath = {};
  var twitter, uid;
  var state;
  var score;
  var addedPlayer;

  var objects = ["shoe", "food", "water", "happiness", "coffee"];

  var $playerTable = $('#players-table tbody');

  // ref.authAnonymously(function(error, authData) {
  ref.authWithOAuthPopup('twitter', function(error, authData) {
    if (error) return console.log('Login Failed: ', error);
    twitter = authData.twitter;
    uid = authData.uid;
    init();
  }, {
    remember: 'sessionOnly'
  });

  function init() {
    Webcam.attach('#my-camera');

    gamestate.on('value', function(snapshot) {
      if (!snapshot.val()) {
        gamestate.set(0);
        state = 0;
      } else {
        state = snapshot.val();
      }
      $('#target-object').text("Go find a " + objects[snapshot.val() % objects.length]);

    });
    score = 0;
    addedPlayer = players.push({
      uid: uid,
      username: twitter.username,
      score: 0
    });
    addedPlayer.onDisconnect().remove();
    addPlayerListeners();

    $('.snapshot').click(takeSnapshot);
  }

  // Attach listeners to players
  function addPlayerListeners() {
    players.orderByChild('score');
    players.on('child_added', function(snapshot, prevSnapshot) {
      var data = snapshot.val();
      addPlayerToDom(snapshot.key(), prevSnapshot, data.username, data.score);
    });
    players.on('child_removed', function(snapshot, prevSnapshot) {
      removePlayerFromDom(snapshot.key(), prevSnapshot);
    });

    players.on('child_moved', changedCallback);
    players.on('child_changed', changedCallback);

  }

  function changedCallback(scoreSnapshot, prevSnapshot) {
    var data = scoreSnapshot.val();
    removePlayerFromDom(scoreSnapshot.key());
    addPlayerToDom(scoreSnapshot.key(), prevSnapshot, data.username, data.score);
  }

  // Add player to DOM
  function addPlayerToDom(key, prevSnapshot, name, score) {
    var newPlayerRow = $('<tr/>');
    var nameTd = $('<td/>').append($('<em/>').text(name));
    var scoreTd = $('<td/>').text(score);
    newPlayerRow.append(nameTd);
    newPlayerRow.append(scoreTd);
    $playerTable.append(newPlayerRow);

    htmlForPath[key] = newPlayerRow;

    if (prevSnapshot === null) {
      $playerTable.append(newPlayerRow);
    } else {
      var lowerRow = htmlForPath[prevSnapshot];
      lowerRow.before(newPlayerRow);
    }
  }

  function removePlayerFromDom(key, prevSnapshot) {
    var removedScoreRow = htmlForPath[key];
    removedScoreRow.remove();
    delete htmlForPath[key];
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
            'Authorization': 'Bearer GVUFXq6NSHxWhxdnIKy7ss0YB2o4Rk'
          },
          data: 'encoded_data=' + rawImage
        })
        .done(function(data) {
          console.log(data.results[0].result.tag.classes);
          var arrayLength = data.results[0].result.tag.classes.length;
          for (var i = 0; i < arrayLength; i++) {
            if (data.results[0].result.tag.classes[i] == objects[state % objects.length]) {
              gamestate.set(state + 1);
              score++;
              addedPlayer.update({
                uid: uid,
                username: twitter.username,
                score: score
              });
              return;
            }
          }

        });
    });
  }
});
