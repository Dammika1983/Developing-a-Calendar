/*
 * Student Name: Dammika Pathirana
 * Student ID: 041089481
 * Course: CST8209 - Web Programming I
 * Semester: 23W
 * Assignment: 4
 * Date Submitted: 16/04/2023 
 */

// declare an object Calendar
function Calendar(elem) {

  // HTML element in which to display the calendar
  this.elem = elem;
  
  // array containing list of names of the days of the week 
  this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  /** Returns the month name of the year for a given month index.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @returns {string} the name of the given month
   */
  this.getMonth = function(monthIndex) {  

    // replace this with your solution from Assignment 1!
	// Declare the Month
    switch(monthIndex) {
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;	
		case 3:
			return "April";
			break;	
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;		
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;	
		case 10:
			return "November";
			break;	
		case 11:
			return "December";
			break;			
		default:
			return "Unknown";
	}

    
  }
  
  /** Returns the number of days in the month for a given zero-based month index and year.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @param year {number} a 4-digit year
   * @returns {number} the number of days in the given month and year
   */
  this.getDaysInMonth = function(monthIndex, year) {
    // 30 days has April, June, September and November.
    // replace this with your solution from Assignment 1!
	  // Declare the dates
    if(isNaN(monthIndex) || monthIndex <0 || monthIndex > 11) {
			return -1;
	  } else if(monthIndex === 1) {
		  if(year%4 === 0 && year%100 === 0 && year%400 === 0){	
			  return 29;
		  } else{
			  return 28;
		  }	
	  } else if(monthIndex === 3 || monthIndex === 5 || monthIndex === 10 || monthIndex === 8) {
      return 30;
	  
    } else{
		  return 31;
	  }
  }
   
    // the displayDate parameter indicates the year and month to render (display) 
  this.display = function(displayDate = new Date()) {
    // clear the calendar element
    $(this.elem).empty();
    
    // get the number of days in the month
    let daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());
    
    // get array of days to display
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(),i));
    }

    var table = $("<table>");
    var thead = $('<thead>');
    var tbody = $('<tbody>');

    var row_1 = $("<tr>");
    var heading_1 = $("<td>");

    // create previous button
	  var myButton = $("<button>");
	  myButton.attr("value", "Previous Month").text("<<");
    myButton.click(function () {
      cal.display(new Date(displayDate.getFullYear() , (displayDate.getMonth() - 1))); 
    });

    heading_1.append(myButton);
    row_1.append(heading_1);
	
    let heading_2 = $("<td>");
    heading_2.attr("colspan","5")
    heading_2.html('<h1>'+this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear()+'</h1>');
    row_1.append(heading_2);
    
	// create previous button
    let heading_3 = $("<td>");
    var myNextButton = $("<button>");
	  myNextButton.attr("value", "Next Month").text(">>");
    myNextButton.click(function () {
      cal.display(new Date(displayDate.getFullYear() , (displayDate.getMonth() + 1))); 
    });

    heading_3.append(myNextButton);
    row_1.append(heading_3);
 
    //Declare the Days of the week.
    let row_2 = $('<tr>');
    for (const elem of this.dayNames) {
      let heading = $('<th>');
      heading.html(elem);
      row_2.append(heading);
    }

    thead.append(row_1);
    thead.append(row_2);

    //Declare the Table body content.
    let body_row = $('<tr>');

    for (let i = 0; i < days[0].getDay(); i++) {
      let body_row_td = $('<td>');
      body_row.append(body_row_td);
    }

    for (let i = 0; i < days.length; i++) {
      // create a table cell with the CSS class "day", and the text value of the day of the month 
      let column_data = $('<td>');
      column_data.addClass("day");
      column_data.html(days[i].getDate());

      // if this day is a Sunday, end the previous week table row, and start a new row 
      if (days[i].getDay() == 0) {
        tbody.append(body_row);
        body_row = $('<tr>');
        body_row.append(column_data);
      } else {
        body_row.append(column_data);
      }

      if(i === (days.length - 1) && days[i].getDay() !== 0) {
        tbody.append(body_row);
      }
    }

    for (let i = days.at(-1).getDay() + 1; i < 7; i++) {
      new_body_td = $('<td>');
      tbody.append(new_body_td);
    }
  
    table.append(thead);
    table.append(tbody);
    $('#calendar').append(table);
  }
}

// declare a instance of Calendar
const cal = new Calendar($("#calendar")[0]);

// declare Clock
var bar = new ProgressBar.Line(progressBar, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: 'grey',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '8px'}
});

function showCurrentTime () {
  let date = new Date();
  let hour = date.getHours(); //Current hour
  let minutes = date.getMinutes(); //Current minute
  let seconds = date.getSeconds(); //Current second

  if(hour < 10) {
      hour = "0"+hour;
  }

  if(minutes < 10) {
      minutes = "0"+minutes;
  }

  if(seconds < 10) {
      seconds = "0"+seconds;
  }

  $('#hrs').text(hour);
  $('#mins').text(minutes);
  $('#secs').text(seconds);

  //Animate the progress bar
  bar.animate(seconds/60);  // Number from 0.0 to 1.0
}

window.setInterval(showCurrentTime, 1000);

// call the display() method
cal.display();

const events = [];
$('#form_success').hide();

//Date validation
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

//Form reset button
$('#btn_reset').on('click', function() {
  $('#date_validation').text("");
  $('#title_validation').text("");
});

//Form handling
$('#data_form').on('submit', function(e) {
  e.preventDefault();
  let allowSubmit = true;
  let inputStrig = "";
  let edateAllowSubmit = true;
  let etitleAllowSubmit = true;

  let edate = $('#edate').val();
  let etitle = $('#etitle').val();
  let edescription = $('#edescription').val();
  
  if(edate === "" || edate === null) {
    edateAllowSubmit = false;
    $('#date_validation').text("Event date is required.");
  } else if(!dateIsValid(new Date(edate))) {
    edateAllowSubmit = false;
    $('#date_validation').text("Invalid date.");
  } else {
    edateAllowSubmit = true;
	  $('#date_validation').text("");
  }

  if(etitle === "" || etitle === null) {
    etitleAllowSubmit = false;
    $('#title_validation').text("Event title is required.");
  } else if(etitle.length < 3) {
    etitleAllowSubmit = false;
    $('#title_validation').text("Event title should be at least 3 characters long.");
  } else {
    etitleAllowSubmit = true;
    $('#title_validation').text("");
  }

  if(edateAllowSubmit && etitleAllowSubmit) {
    inputStrig += edate+", "+etitle;
    if(edescription !== "") {
      inputStrig += ", "+edescription;
    }
    events.push(inputStrig);
    $('#form_success').show();
    $('#btn_reset').trigger('click');
    window.setTimeout(function() {
      $('#form_success').hide();
    }, [3000]);
    console.log(events);
  }
})
