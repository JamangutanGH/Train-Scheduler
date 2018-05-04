$(document).ready(function () {
    var database = firebase.database();
    

    database.ref().on("child_added", function (snapshot) {
        console.log("from child added");
        var taskName = "";
        var trainName = "";
        var destination = "";
        var trainInitiation = "";
        var trainFrequency = "";
        var timeAdded = "";

        console.log(snapshot.val());
    });
    database.ref().on("value", function (snapshot) {
        var data = snapshot.val() || {};
        $("#to-dos").empty();

        var keys = Object.keys(data);

        console.log("cptnslog---Object.keys(data)");

        console.log(Object.keys(data));
        for (var i = 0; i < keys.length; i++) {
          

            var tbody = $("<tbody>");
            var tr = $("<tr>");
            var rowMsg = $("<span>");

            rowMsg.append(trainName + " " + destination + " " + trainInitiation + " " + trainFrequency);


            tr.append(rowMsg);
            tbody.append(tr);
            $("#to-dos").append(tbody);
        }
    });

    // $(document).on("click", ".delete-task", function () {
    //     var taskId = $(this).attr("data-task-id");
    //     database.ref().child(taskId).remove();
    // });

    $("#addTask").on("click", function () {
        taskName = $("#task").val().trim();
        trainName = $("#trainName-FormId").val().trim();
        destination = $("#destination-FormId").val().trim();
        trainInitiation = $("#firstTrainTime-FormId").val().trim();
        trainFrequency = $("#frequency-FormId").val().trim();

        database.ref().push({
            task: taskName,
            trainName: trainName,
            destination:destination,
            trainInitiation: trainInitiation,
            trainFrequency: trainFrequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //console.log(taskName);
        $("#task").val("");
    });
});

    // ALL THE MATHS I NEEDED!!


    
    // the int that will be used to compare time before and after current time and measure time difference
    // var Frequency = "#set by user "

    // another int value to set as the starting time for the train frequency equation
    // var trainInitiation = "HH:MM set by user";

    // Current Time
    // var currentTime = moment();
    //a timestamp from the database refrence to serve as the dynamic variable to calculate time between train arrival + departure
    
    // gather the toal time between origination and current in minutes 

    // use the mod operator to determine diffence in minutes of frequency to current time

    // log results into corresponding div spans and populate on the corresponding dom element
//store data in obj  so that i may draw from one centralized source

// var { 
//     trainDestinations:[],
//     destinations:[],
//     initiationTime:[],
//     interval:[]
// }

//[]
    // var arr = [];
    // var name = "";
    // var destination = "";
    // var trainInitiation = 0;
    // var trainFrequency = 0;
    //refer the database at its rootlvl on value change and run another anon()
    // database.ref().on("value", function (snapshot) {
        //logging the data at the (rootlvl) through an onclick
        //console.log(snapshot.val());
        //emptying anything with an id of trens
        //$("#submitClick").empty();




        //storing the value of this callback() as data which is an object 
        // var data = snapshot.val() || {}; //data = {}
        // console.log(data = snapshot.val());


        // setting a conditional for an empty object    
        // if (data !== null) {
            //var keys = Object.keys(data);
            // var name = "";
            // var destination = "";
            // var trainInitiation = 0;
            // var trainFrequency = 0;
            //console.log(Object.keys(data));

            // converting the present value state of the rootlvl firebase
            // into a variable so that i may see the VALUE of the root manipulate its contents
            //var keys = Object.keys(data);// keys = [array]

            // iterating [i] over the contents contents of the array with a 4loop @ its current .length
            //for (var i = 0; i < Object.keys.length; i++) {
            //console.log(data[keys[i]]);

            //create an html element for each iteration
            // <tr
            //     <span>🚂Name</span><span>Destination</span><span>frequecy...
            // </tr>

            //create
            // var div = $("<div>");
            // var button = $("<button>");
            // var span = $("<span>");
            //set
            //button.text("🚂");
            //span.text(data[keys[i]].task);
            // console.log(span.text(data[keys[i]].task));
            //append
            //div.append(button);
            //div.append(span);

            //target the element with the ID of tren and .append div
            // $("#trens").append(div);

            // }
        // }

    