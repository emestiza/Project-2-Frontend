//SET URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = "https://job-tracker-emestiza.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $createButton = $("#create");
const $updateButton = $("#update");
const $deleteButton = $("#delete");
const $jobBody = $("#jobBody");

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
      $tr.append($('<td>').button($updateButton));
      $tr.append($('<td>').button($deleteButton));
      // append the whole <tr> to the <tbody>
      $jobBody.append($tr)
    })
};

getJob();

// Create job row
//   const createJob = async () => {
//     // Create new job row from table data
//     const newJob = {
//             // make a new <tr> element
//       const $tr = $('<tr>')
//       // add job info as <td> in the <tr>
//       $tr.append($('<td>').text(`${job.company}`));
//       $tr.append($('<td>').text(`${job.position}`));
//       $tr.append($('<td>').text(`${job.location}`));
//       $tr.append($('<td>').text(`${job.date}`));
//       $tr.append($('<td>').text(`${job.phone}`));
//       $tr.append($('<td>').text(`${job.onsite}`));
//       $tr.append($('<td>').text(`${job.offer}`));
//       $tr.append($('<td>').text(`${job.url}`));

//       // company: .val(),
//       // position: .val(),
//       // location: .val(),
//       // date: .val(),
//       // phone: .val(),
//       // onsite: .val(),
//       // offer: .val(),
//       // url: .val()
//       // append the whole <tr> to the <tbody>
//       $jobBody.append($tr)
//     };

//     //Send request to api to create job
//     const response = await fetch(`${URL}/job`, {
//       method: "post",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(newJob)
//     });
//     const data = response.json();
//     //update the DOM
//     $jobBody.empty();
//     getJob();
//   };

// Update
  // Update a job row
//   const updateJob = async (event) => {
//     // Logging the event object
//     console.log(event)
//     // Create updated job object
//     const updatedJob = {
//             // make a new <tr> element
//       const $tr = $('<tr>')
//       // add job info as <td> in the <tr>
//       $tr.append($('<td>').text(`${job.company}`));
//       $tr.append($('<td>').text(`${job.position}`));
//       $tr.append($('<td>').text(`${job.location}`));
//       $tr.append($('<td>').text(`${job.date}`));
//       $tr.append($('<td>').text(`${job.phone}`));
//       $tr.append($('<td>').text(`${job.onsite}`));
//       $tr.append($('<td>').text(`${job.offer}`));
//       $tr.append($('<td>').text(`${job.url}`));
//       // append the whole <tr> to the <tbody>
//       $jobBody.append($tr)
      
//       // company: .val(),
//       // position: .val(),
//       // location: .val(),
//       // date: .val(),
//       // phone: .val(),
//       // onsite: .val(),
//       // offer: .val(),
//       // url: .val()
//     }
//     // Make put request
//     const response = await fetch(`${URL}/job/${event.target.id}`, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(updatedJob)
//     })
//     // Update the DOM
//     $jobBody.empty();
//     getJob();
//   }
  
   // Delete job row
  const deleteJob = async (event) => {
    // Make delete request
    const response = await fetch(`${URL}/job/${event.target.id}`, {
      method: "delete"
    });
     //update the DOM
     $jobBody.empty();
     getJob();
  }

  //initially get existing jobs
  getJob();
  //add create function to create button
  $createButton.on('click', createJob);
  //add update function to update button
  $updateButton.on("click", updateJob)
  //add delete function to delete button
  $deleteButton.on("click", deleteJob)



// Hamburger Toggle
jQuery(function($){
    $( '.navbar.navbar-4' ).click(function(){
    $('.navbar-toggler-icon').toggleClass('expand')
    })
 })


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
