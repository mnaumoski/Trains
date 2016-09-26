  $(document).ready(function() {
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyAv0YOCWtIxD64X0f1_bbAB08XyHuWH7Jk",
          authDomain: "trainstation-2b3dd.firebaseapp.com",
          databaseURL: "https://trainstation-2b3dd.firebaseio.com",
          storageBucket: "trainstation-2b3dd.appspot.com",
          messagingSenderId: "393068726925"
      };
      firebase.initializeApp(config);
      // inital varibles
      // database
      var database = firebase.database();
      // train
      var train = "";
      var destination = "";
      var start = "";
      var interval = 0;
      // show the current running time
      function update() {
          $('#current').html(moment().format('D. MMMM YYYY H:mm:ss'));
      }
      setInterval(update, 1000);
      // 2. Button for adding trains
      $("#addTrain").on("submit", function() {

          // grab inputs
          train = $("#train").val().trim();
          destination = $("#destination").val().trim();
          start = $("#start").val().trim();
          interval = $("#interval").val().trim();


          var newTrain = {
              train: train,
              destination: destination,
              start: start,
              interval: interval
          }

          database.ref().push(newTrain); // this is new. uploads data to database with push

          // print to console
          console.log(newTrain.train);
          console.log(newTrain.destination);
          console.log(newTrain.start);
          console.log(newTrain.interval);

          alert("Train line successfully added.");

          // clear all text inputs
          $("#train").val("");
          $("#destination").val("");
          $("#start").val("");
          $("#interval").val("");


          return false;

      });

      // create Firebase event for adding employee to the database and a row in the html when a user adds an entry
      database.ref().on("child_added", function(childSnapshot, prevChildKey) {

          console.log(childSnapshot.val());

          var train = childSnapshot.val().train;
          var destination = childSnapshot.val().destination;
          var start = childSnapshot.val().start;
          var interval = childSnapshot.val().interval;
          // console log printing
          console.log(train);
          console.log(destination);
          console.log(start);
          console.log(interval);


          var startMoment = moment(childSnapshot.val().start, "hh:mm").subtract(1, "years");

          var diffTime = moment().diff(moment(startMoment), "minutes");

          var remainder = diffTime % childSnapshot.val().interval;

          var wait = childSnapshot.val().interval - remainder;

          var nextTrain = moment().add(wait, "minutes");

          console.log("Train Name: " + childSnapshot.val().train);
          console.log("Destination: " + childSnapshot.val().destination);
          console.log("First Train: " + childSnapshot.val().start);
          console.log("Frequency: " + childSnapshot.val().interval);
          console.log("Next Train Time: " + moment(nextTrain).format("hh:mm A"));
          console.log("Minutes Until: " + wait);
          console.log("====================");

          // add each data to the table
          $("#trainTable > tbody").append('<tr><td>' + train + '</td><td>' + destination + '</td><td>' + interval + '</td><td>' + wait + '</td><td>' + nextTrain + '</td></tr>');
      }, function(errorObject) {

          console.log("The read failed: " + errorObject.code);

      });


  });
  // wait time is the time difference between current time and arrival time
  // current time is already running in html
  //arrival time is the start time plus interval time
