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

      // show the current running time
      function update() {
          $('#current').html(moment().format('D. MMMM YYYY H:mm:ss'));
      }
      setInterval(update, 1000);
      // 2. Button for adding trains
      $("#addTrain").on("click", function() {

          // grab inputs
          var train = $("#train").val().trim();
          var destination = $("#destination").val().trim();
          // format in unix time
          var firstTrainUnix = moment($("#start").val().trim(), "HH:mm").subtract(10, "years").format("X");
          var start = $("#start").val().trim();
          var interval = $("#interval").val().trim();

          // local object for holding the data
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

          var prettyStart = moment.unix(parseInt(start)).format("YYYY-MM-DD HH:mm");
          var prettyInterval = moment.unix(parseInt(interval)).format("mm");

          // console log printing
          console.log("Train line: " + train + " goes to " + destination + ". " + "Start & interval UNIX times: " + start + " & " + interval + ". " + "The times that need to be displayed are start and interval " + prettyStart + " & " + prettyInterval + ".");


          var differenceTimes = moment().diff(moment.unix(parseInt(start)), "minutes");

          console.log("Difference times " + differenceTimes);

          var x = moment.unix(differenceTimes).format("YYYY-MM-DD HH:mm");

          var tRemainder = parseInt(differenceTimes % interval);
          var tMinutes = interval - tRemainder;
          var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
          var nextTrainUnix = parseInt(start) + parseInt(interval);
          var nextPretty = moment.unix(nextTrainUnix).format("HH:mm");
          
          // var diffTime = moment().diff(moment(prettyStart), "minutes");
          var prettyDiff = moment.unix(differenceTimes).format("mm");
          var remainder = differenceTimes % prettyDiff;
          var wait = moment.unix(tMinutes).format("HH:mm");

          // add each data to the table
          $("#trainTable > tbody").append('<tr><td>' + train + '</td><td>' + destination + '</td><td>' + prettyInterval + " minutes" + '</td><td>' + tArrival + '</td><td id="up">' +wait+ " minutes" + '</td><td>');
      }, function(errorObject) {

          console.log("The read failed: " + errorObject.code);

      });

  });
