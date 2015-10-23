$(document).ready(function() {
  var firebaseRef = CONFIG.BASE_URL;
  var players = new Firebase(firebaseRef + '/playerboard');
  var ref = new Firebase(firebaseRef);
  var gamestate = new Firebase(firebaseRef + '/gamestate');
  var htmlForPath = {};
  var twitter, uid;
  var state;
  var score;
  var addedPlayer;

  var objects = ["iphone", "happiness", "bottle", "apple"];

  var $playerTable = $('#players-table tbody');

  var clarifai = new Clarifai(
    {
      'clientId': CONFIG.API_KEYS.clarifai.clientId,
      'clientSecret': CONFIG.API_KEYS.clarifai.clientSecret
    }
  );

  ref.authWithOAuthPopup('twitter', function(error, authData) {
    if (error) return console.log('Login Failed: ', error);
    twitter = authData.twitter;
    uid = authData.uid;
    init();
  }, {
    remember: 'sessionOnly'
  });

  function init() {
    Webcam.set({
			width: 320,
			height: 240,
			// dest_width: 640,
			// dest_height: 480,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
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
    Webcam.snap(function(dataUri) {
      var rawImage = dataUri.replace(/^data\:image\/\w+\;base64\,/, '');

      $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'POST',
        headers: {
          Authorization: 'Client-ID ' + CONFIG.API_KEYS.imgur.clientId,
          Accept: 'application/json'
        },
        data: {
          image: rawImage,
          type: 'base64'
        }
      }).done(sendToClarify);
    });
  }

  function sendToClarify(imgurData) {
    clarifai.predict(imgurData.data.link, objects[state % objects.length], function(prediction) {
      console.log(prediction);
      if (prediction.score * 100 < 60) return;
      gamestate.set(state + 1);
      score++;
      addedPlayer.update({
        uid: uid,
        username: twitter.username,
        score: score
      });
    });
  }
});
