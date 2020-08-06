//SET URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
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

const $companyEdit = $("#companyEdit");
const $positionEdit = $("#positionEdit");
const $locationEdit = $("#locationEdit");
const $dateEdit = $("#dateEdit");
const $phoneEdit = $("#phoneEdit");
const $onsiteEdit = $("#onsiteEdit");
const $offerEdit = $("#offerEdit");
const $urlEdit = $("#urlEdit");
const $saveButton = $("#saveButton");

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
      const $updateButton = $('<button>').text("Update").addClass("update").attr("id", job._id).attr("data-toggle","modal").attr("data-target", "modal" + `${job._id}`)
      $tr.append($('<td>').append($updateButton));
      const $deleteButton = $('<button>').text("Delete").addClass("delete").attr("id", job._id);
      $tr.append($('<td>').append($deleteButton));
      console.log(job._id)
      $updateButton.on("click", () => {
          openModal(job)
      })
      $deleteButton.on("click", (event) => {
        deleteJob(event, job)
    })
      // append the whole <tr> to the <tbody>
      $jobBody.append($tr)
    })
    // $editModalWindow.attr("data-target", "modal" + `${job._id}`)
    // $(".update").on("click", openModal)
    // $(".delete").on("click", deleteJob)
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

// Modal Function
function openModal(job){
    console.log(job)
    $editModalWindow.attr("data-target", "modal" + `${job._id}`)
        $companyEdit.val(job.company),
        $positionEdit.val(job.position),
        $locationEdit.val(job.location),
        $dateEdit.val(job.date),
        $phoneEdit.val(job.phone),
        $onsiteEdit.val(job.onsite),
        $offerEdit.val(job.offer),
        $urlEdit.val(job.url)
        $saveButton.attr("id", job._id) 
    $('#editModal').modal('show')
    console.log("whatever")
} 

// Save 
  // Update a job row
  const updateJob = async (event) => {
    // Logging the event object
    console.log(event)
    // Create updated job object
    const updatedJob = {
        company: $companyEdit.val(),
        position: $positionEdit.val(),
        location: $locationEdit.val(),
        date: $dateEdit.val(),
        phone: $phoneEdit.val(),
        onsite: $onsiteEdit.val(),
        offer: $offerEdit.val(),
        url: $urlEdit.val()
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
  const deleteJob = async (event, job) => {
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
  $saveButton.on('click', updateJob);

