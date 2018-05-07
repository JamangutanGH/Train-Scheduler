$(document).ready(function () {
    var database = firebase.database();
    database.ref().on("child_added", function (snapshot) {
        console.log("from child added");
        var trainName;  // setting the global value of the variables used in the backend
        var destination;
        var startTime;
        var frequency;
        var currentMoment;
        var differenceMoment;

        console.log(snapshot.val());
    });

    $("button").on("click", function () {                    //setting a click event for the submit button
        event.preventDefault();                              // prevent default even on button click *1*
        trainName = $("#trainNameFormId").val().trim();      // updating the value of the corresponding variables
        destination = $("#destinationFormId").val().trim();  //targeting the corresponding form ID and recording its value
        startTime = $("#startTimeFormId").val().trim();
        frequency = $("#frequencyFormId").val().trim(); 
        database.ref().push({

            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // converting the input time value to moment.js format and subtracting a day
        var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "days");
        // getting a current time via moment.js
        var currentTime = moment();
        // determine the difference in the start time and current time into minutes
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        // using the mod method to get the difference between the two moment.js time variables
        var tRemainder = diffTime % frequency;
        // subtracting the mod from the the set fgrequency to determine time to the next train
        var tMinutesTillTrain = frequency - tRemainder;
        // the difference in time is added to the current time to guage the arrival of the next train    
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // converting the time of the next train to a time hh:mm format
        var nextTrainConverted = moment(nextTrain).format("hh:mm");

        $("#trainNameFormId").val("");       // clearing the forms input value after submission
        $("#destinationFormId").val("");
        $("#startTimeFormId").val("");
        $("#frequencyFormId").val("");

        // pushing the input values into a new tr in the html table
        $("#trainTable tr:last").after("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + startTime + "</td><td>" + frequency + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });

    database.ref().on("value", function (snapshot) {
        var data = snapshot.val() || {};
        $("#to-dos").empty();

        var keys = Object.keys(data);
        console.log("cptnslog---keys");
        console.log(keys);


    });

});


// $("#addTask").on("click", function () {
//     taskName = $("#task").val().trim();
//     trainName = $("#trainName-FormId").val().trim();
//     destination = $("#destination-FormId").val().trim();
//     trainInitiation = $("#firstTrainTime-FormId").val().trim();
//     trainFrequency = $("#frequency-FormId").val().trim();

    // database.ref().push({
    //     task: taskName,
    //     trainName: trainName,
    //     destination: destination,
    //     trainInitiation: trainInitiation,
    //     trainFrequency: trainFrequency,
    //     timeAdded: firebase.database.ServerValue.TIMESTAMP
    // });
//     //console.log(taskName);
//     $("#task").val("");
// });










