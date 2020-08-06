//SET URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
// const deployedURL = "http://localhost:3000";
const deployedURL = "https://job-tracker-emestiza.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $company = $("#company");
const $position = $("#position");
const $location = $("#location");
const $date = $("#date");
const $phone = $("#phone");
const $onsite = $("#onsite");
const $offer = $("#offer");
const $url = $("#url");
const $createButton = $(".create");
const $jobBody = $("#jobBody");
const $editModalWindow = $("#editModal")

// Get all job rows
const getJob = async () => {
    // Gets the job rows
    const response = await fetch(`${URL}/job`);
    const data = await response.json();
    
    // Logs data to console - Only for testing 
    // console.log(data)
  
    // Populate DOM with job rows
    data.forEach((job) => {
      // make a new <tr> element
      const $tr = $('<tr>')
      // add job info as <td> in the <tr>
      $tr.append($('<td>').text(`${job.company}`));
      $tr.append($('<td>').text(`${job.position}`));
      $tr.append($('<td>').text(`${job.location}`));
      $tr.append($('<td>').text(`${job.date}`));
      $tr.append($('<td>').text(`${job.phone}`));
      $tr.append($('<td>').text(`${job.onsite}`));
      $tr.append($('<td>').text(`${job.offer}`));
      $tr.append($('<td>').text(`${job.url}`));
      $tr.append($('<td>').append($('<button>').text("Update").addClass("update").attr("id", job._id).attr("data-toggle","modal").attr("data-target", "modal" + `${job._id}`)));
      $tr.append($('<td>').append($('<button>').text("Delete").addClass("delete").attr("id", job._id)));
      console.log(job._id)
      // append the whole <tr> to the <tbody>
      $jobBody.append($tr)
    })
    $editModalWindow.attr("data-target", "modal" + `${job._id}`)
    $(".update").on("click", updateJob)
    $(".delete").on("click", deleteJob)
    console.log($(".delete"))

};

getJob();

// Create job row
  const createJob = async () => {
    // Create new job row from table data
    const newJob = {
      company: $company.val(),
      position: $position.val(),
      location: $location.val(),
      date: $date.val(),
      phone: $phone.val(),
      onsite: $onsite.val(),
      offer: $offer.val(),
      url: $url.val()
    };

    //Send request to api to create job
    const response = await fetch(`${URL}/job`, {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newJob)
    });
    const data = response.json();
   
    //update the DOM
    $jobBody.empty();
    getJob();
  };

// Modal function 


// Update 
  // Update a job row
  const updateJob = async (event) => {
    // Logging the event object
    console.log(event)
    // Create updated job object
    const updatedJob = {
        company: $company.val(),
        position: $position.val(),
        location: $location.val(),
        date: $date.val(),
        phone: $phone.val(),
        onsite: $onsite.val(),
        offer: $offer.val(),
        url: $url.val()
    }
    // Make put request
    const response = await fetch(`${URL}/job/${event.target.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedJob)
    })
    // Update the DOM
    $jobBody.empty();
    getJob();
  }
  
   // Delete job row
  const deleteJob = async (event) => {
      console.log(event)
    // Make delete request
    const response = await fetch(`${URL}/job/${event.target.id}`, {method: "delete"});

     //update the DOM
     $jobBody.empty();
     getJob();
  }

  //initially get existing jobs
  getJob();
  //add create function to create button
  $createButton.on('click', createJob);


 // Post MVP 
// Table Actions
// $(document).ready(function(){
// 	$('[data-toggle="tooltip"]').tooltip();
// 	const actions = $("table td:last-child").html();
// 	// Append table with add row form on add new button click
//     $(".add-new").click(function(){
// 		$(this).attr("disabled", "disabled");
// 		const index = $("table tbody tr:last-child").index();
//         const row = '<tr>' +
//             '<td><input type="text" class="form-control" name="company" id="company"></td>' +
//             '<td><input type="text" class="form-control" name="position" id="position"></td>' +
//             '<td><input type="text" class="form-control" name="location" id="location"></td>' +
//             '<td><input type="text" class="form-control" name="date" id="date"></td>' +
//             '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
//             '<td><input type="text" class="form-control" name="onsite" id="onsite"></td>' +
//             '<td><input type="text" class="form-control" name="offer" id="offer"></td>' +
//             '<td><input type="text" class="form-control" name="url" id="url"></td>' +
// 			'<td>' + actions + '</td>' +
//         '</tr>';
//     	$("table").append(row);		
// 		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
//         $('[data-toggle="tooltip"]').tooltip();
//     });
// 	// Add row on add button click
// 	$(document).on("click", ".add", function(){
// 		const empty = false;
// 		const input = $(this).parents("tr").find('input[type="text"]');
//         input.each(function(){
// 			if(!$(this).val()){
// 				$(this).addClass("error");
// 				empty = true;
// 			} else{
//                 $(this).removeClass("error");
//             }
// 		});
// 		$(this).parents("tr").find(".error").first().focus();
// 		if(!empty){
// 			input.each(function(){
// 				$(this).parent("td").html($(this).val());
// 			});			
// 			$(this).parents("tr").find(".add, .edit").toggle();
// 			$(".add-new").removeAttr("disabled");
// 		}		
//     });
// 	// Edit row on edit button click
// 	$(document).on("click", ".edit", function(){		
//         $(this).parents("tr").find("td:not(:last-child)").each(function(){
// 			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
// 		});		
// 		$(this).parents("tr").find(".add, .edit").toggle();
// 		$(".add-new").attr("disabled", "disabled");
//     });
// 	// Delete row on delete button click
// 	$(document).on("click", ".delete", function(){
//         $(this).parents("tr").remove();
// 		$(".add-new").removeAttr("disabled");
//     });
// });
