//SET URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = "https://job-tracker-emestiza.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $createButton = $("#create");
const $updateButton = $("#update");
const $deleteButton = $("#delete");

//FUNCTIONS
$.getJSON("https://job-tracker-emestiza.herokuapp.com", function(data) {
    $(data).each(function(index, job) {
        $('#jobBody').append($("<tr>")
        .append($("<td>").append(job.company))
        .append($("<td>").append(job.position))
        .append($("<td>").append(job.location))
        .append($("<td>").append(job.date))
        .append($("<td>").append(job.phone))
        .append($("<td>").append(job.onsite))
        .append($("<td>").append(job.offer))
        .append($("<td>").append(job.url))
        );
    });
});
  
// Get all jobss
const getJob = async () => {
    // Gets the jobs
    const response = await fetch(`${URL}/job`);
    const data = await response.json();
    console.log(data)
    // Populate DOM with jobs
    data.forEach((job) => {
		// Append table with add row form on add new button click
        $(".add-new").click(function(){
            $(this).attr("disabled", "disabled");
            const index = $("table tbody tr:last-child").index();
            const row = '<tr>' +
                '<td><input type="text" class="form-control" name="company" id="company"></td>' +
                '<td><input type="text" class="form-control" name="position" id="position"></td>' +
                '<td><input type="text" class="form-control" name="location" id="location"></td>' +
                '<td><input type="text" class="form-control" name="date" id="date"></td>' +
                '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
                '<td><input type="text" class="form-control" name="onsite" id="onsite"></td>' +
                '<td><input type="text" class="form-control" name="offer" id="offer"></td>' +
                '<td><input type="text" class="form-control" name="url" id="url"></td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
            $("table").append(row);		
            $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
            $('[data-toggle="tooltip"]').tooltip();
        });
    })
};

getJob();
  
  // CREATE A RAT
  const createRat = async () => {
    //Create to New Rat from Form Data
    const newRat = {
      name: $nameInput.val(),
      pizza: $pizzaSelect.val(),
    };
    //Send request to api to create rat
    const response = await fetch(`${URL}/rats`, {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newRat)
    });
    const data = response.json();
    //update the DOM
    $ul.empty();
    getRats();
  };
  
  // DELETE
  const deleteRat = async (event) => {
    const response = await fetch(`${URL}/rats/${event.target.id}`, {method: "delete"});
  
     //update the DOM
     $ul.empty();
     getRats();
  }
  
  //UPDATE
  //Update a Rat
  const updateRat = async (event) => {
    //Logging the event object
    console.log(event)
    //Create Updated Rat Object
    const updatedRat = {
      name: $nameEditInput.val(),
      pizza: $pizzaEditSelect.val()
    }
    //make our put request
    const response = await fetch(`${URL}/rats/${event.target.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRat)
    })
    //update the dom
    $ul.empty();
    getRats();
  }
  
  // Main Application Logic
  // Start executing below
  
  //initially get existing jobs
  getJob();
  //add create function to button click
  $button.on('click', createRat);
  //add update function to edit submit button
  $editButton.on("click", updateRat)


// Table Actions
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	const actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		const index = $("table tbody tr:last-child").index();
        const row = '<tr>' +
            '<td><input type="text" class="form-control" name="company" id="company"></td>' +
            '<td><input type="text" class="form-control" name="position" id="position"></td>' +
            '<td><input type="text" class="form-control" name="location" id="location"></td>' +
            '<td><input type="text" class="form-control" name="date" id="date"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td><input type="text" class="form-control" name="onsite" id="onsite"></td>' +
            '<td><input type="text" class="form-control" name="offer" id="offer"></td>' +
            '<td><input type="text" class="form-control" name="url" id="url"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		const empty = false;
		const input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});



// Hamburger Toggle
jQuery(function($){
    $( '.navbar.navbar-4' ).click(function(){
    $('.navbar-toggler-icon').toggleClass('expand')
    })
 })