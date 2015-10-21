# Dinosaur Detector #
This web app was developed by three UBC students Matthew, Denis and Patience
during the fall session of [Dubhacks 2015](http://15f.dubhacks.co). It was
nominated one of the top 5 hacks overall! You can read more about the project
[here](http://devpost.com/software/dinosaur-detector).

This is our keeping-up-with-the-times take on the traditional scavenger hunt.
The objective is to find the objects suggested by the game, before your
competitors beat you to it! Your score will be updated in real time on the
board.

## Tech ##
We built this app with [Firebase](https://www.firebase.com/) to power our
backend and do a live update of the players' scores. For object detection we
used [Clarifai's](http://www.clarifai.com) image recognition/machine learning
API. The imgur API is used to upload images and send them to Clarifai.
[Webcam.js](https://github.com/jhuckaby/webcamjs) was used to control a player's
camera.

## Getting Started ##
* Acquire API keys for Clarifai and Imgur. Create a Firebase account.
* Install firebase-tools: ```npm install -g firebase-tools```
* Duplicate ```configuration-template.js``` in ```/js``` and rename it
 ```configuration.js```. Fill in the API keys and base URL for your firebase
 repo as necessary.
* In the terminal, run ```firebase deploy``` to deploy the app to Firebase
