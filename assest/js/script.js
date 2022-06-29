//function 1.  set current time for the header 
var updateCurrentDay = function(){
    var todayDate = moment().format('dddd , MMM Do YYYY');
    $("#currentDay").text(todayDate);
}

// function 3.  set time's color to match the style.css 
var getHourColor = function(hour){
    var currentHour = moment().hour();

    if(hour < currentHour){
        return 'past';
    }else if(hour === currentHour){
        return 'present';
    }  else {
        return 'future';
    }
} 

//function 4. set timeBlock color
var updateTimeBlockColor = function (){
    console.log(moment().format());
  //  var currentHour = moment().hour();
    $(".time-block").each(function(){
        // set the time to a number not a string
        var blockTime = parseInt($(this).data("hour"));
        var colorClass = getHourColor(blockTime);
// set color change when time is changed .
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");

        $(this).addClass(colorClass);

    });
}
// function 2. set render for every time block 
var renderTimeBlock = function(){
    // for loop for every work hour
    for(var i= 9; i < 24; i++){
        var eachHour = moment(i, "h").format("hh A");
        var timeBlockId = 'hour'+ i;

        // set innerHTML  ALSO get value from description and storage it , if nothing iside, should be empty.
        var timeBlockHTML = `
        <div id="${timeBlockId}" data-hour=${i} class="row time-block">
        <div class="col-md-1 hour">
        ${eachHour}
        </div>
        <textarea class="col-md-10 description">${localStorage.getItem(timeBlockId) ?? ' '}</textarea>
        <button class="col-md-1 saveBtn"><i class="fas fa-save"></i></button>
      </div>
        ` ;
        // put in the container class
        $(".container").append(timeBlockHTML);
    }
    updateTimeBlockColor()
}
//function 5. eady for work this application 
$(document).ready(function(){
    updateCurrentDay();
    renderTimeBlock();
//set onclick event for save button 
$(".saveBtn").on('click',function(){
    // print the button's brother which is texearea's value when user click button
var eventText = $(this).siblings(".description").val();
// storage key is every hour.  so looking for button's parent's id.
var time= $(this).parent().attr("id");

localStorage.setItem(time, eventText);
})

// set refresh the color and time every 1 minutes.
setInterval(updateTimeBlockColor,60000)
})
