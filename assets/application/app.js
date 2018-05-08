$(document).ready(function () {
    var database = firebase.database();
    database.ref().on("child_added", function (snapshot) {
        //console.log("from child added");
        var data = snapshot.val();
        var trainName = data.trainName; //refrencing the trainName values of the snapshot
        // console.log(trainName);
        // setting the global value of the variables used in the backend
        var destination = data.destination;
        var startTime = data.startTime;
        var frequency = data.frequency;
        var timeCalculator = calcTime(startTime, frequency);
        var nextTrain = timeCalculator.nextTrainConverted;
        var minsToTrain = timeCalculator.tMinutesTillTrain;
        //console.log(data);
        console.log(calcTime(startTime, frequency));
        
        
        // template literal
        var tr = $("<tr>").append(`
        <td id="trainNameTd">${trainName}</td> 
        <td id="trainDestinationTd">${destination}</td>
        <td id="trainStartTimeTd">${startTime}</td>
        <td id="trainFrequencyTd">${frequency}</td>
        <td id="minToTrainTd">${minsToTrain}</td>
        <td id="nextTrainTd">${nextTrain}</td>`);
        $("tbody").append(tr);
    });

    $("button").on("click", function (event) { //setting a click event for the submit button
        event.preventDefault(); // prevent default even on button click *1*
        var trainName = $("#trainNameFormId").val().trim(); // updating the value of the corresponding variables
        var destination = $("#destinationFormId").val().trim(); //targeting the corresponding form ID and recording its value
        var startTime = $("#startTimeFormId").val().trim();
        var frequency = $("#frequencyFormId").val().trim();
        database.ref().push({

            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });

        

    });

function calcTime(startTime, frequency){
            // converting the input time value to moment.js format and subtracting a day
            var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "days");
            // getting a current time via moment.js
            var currentTime = moment();
            // determine the difference in the start time and current time into minutes
            var diffTime = currentTime.diff(startTimeConverted, "minutes");
            // using the mod method to get the difference between the two moment.js time variables
            var tRemainder = diffTime % frequency;
            // subtracting the mod from the the set fgrequency to determine time to the next train
            var tMinutesTillTrain = frequency - tRemainder;
            // the difference in time is added to the current time to guage the arrival of the next train    
            var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");
            // converting the time of the next train to a time hh:mm format
            var nextTrainConverted = nextTrain.format("hh:mm");
            
            return {nextTrainConverted, tMinutesTillTrain};
            
            
}

});

// $("#trainNameFormId").val(""); // clearing the forms input value after submission
// $("#destinationFormId").val("");
// $("#startTimeFormId").val("");
// $("#frequencyFormId").val("");

// $("#trainTable tr:last").after("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + startTime + "</td><td>" + frequency + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");
