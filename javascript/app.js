  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAv0YOCWtIxD64X0f1_bbAB08XyHuWH7Jk",
      authDomain: "trainstation-2b3dd.firebaseapp.com",
      databaseURL: "https://trainstation-2b3dd.firebaseio.com",
      storageBucket: "trainstation-2b3dd.appspot.com",
      messagingSenderId: "393068726925"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  console.log("test");
  // Initialize Firebase
  // 2. Button for adding Employees
  $("#addTrain").on("click", function() {

      // grab inputs
      var train = $("#train").val().trim();
      var destination = $("#destination").val().trim();
      var start = moment($("#start").val().trim(), "DD/MM/YY").format("X");
      var interval = $("#interval").val().trim();

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

      alert("Employee successfully added.");

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

      // let's prettify
      var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
      // calculate months worked
      var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
      console.log(empMonths);
      // calculate billed
      var empBilled = empMonths * empRate;
      console.log(empBilled);
      // add each data to the table
      $("#trainTable > tbody").append('<tr><td>' + train + '</td><td>' + destination + '</td><td>' + empStartPretty + '</td><td>' + empMonths + '</td><td>' + empRate + '</td><td>' + empBilled + '</td></tr>');
  });
