# Project Overview

## Project

Link to completed project [here](https://job-tracker-em.netlify.app/).
Link to project frontend [here](https://github.com/emestiza/Project-2-Frontend).
Link to project backend [here](https://github.com/emestiza/Project-2-Backend).

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Complete
|Day 5| Final Touches and Present | Complete

## Project Description

The goal of this project is to build a job application tracker full stack application. In the backend an API is built using Node.js, Express.js, MongoDB, and Mongoose. The API has two models and one association. There is Create, Read, Update, and Destroy (CRUD) functionality built throughout the application. In the frontend JavaScript and jQuery are used to communicate with and leverage the backend API. The fronend also has a responsive design for mobile, tablet, and desktops. The mobile navigation is responsive such that it expands and collapses when a user clicks on the hamburger icon.

## Google Sheet

Link to Google sheet with projects [here](https://docs.google.com/spreadsheets/d/1A-BPvETOegMvze6amsGrhtmqROJjC3dzMqY2djCe__Q/edit#gid=0).

## Wireframes

Below are links to wireframes that show the application blueprint for mobile, tablet, and desktop display sizes.  

- [Mobile](https://res.cloudinary.com/dssciwyew/image/upload/v1596210699/Mobile%20P2.png)
- [Tablet](https://res.cloudinary.com/dssciwyew/image/upload/v1596210699/Tablet%20P2.png)
- [Desktop](https://res.cloudinary.com/dssciwyew/image/upload/v1596210699/Desktop%20P2.png)

## Time/Priority Matrix 

Here is a full list of features that have been [prioritized](https://res.cloudinary.com/dssciwyew/image/upload/v1596243605/Priority%20Matrix%20Frontend%20P2.png) based on the `Time and Priority` Matix. 

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP. The MVP list includes functionality that will be implemented upon project completion.  

#### MVP

- Create and setup HTML, CSS, and JavaScript files for frontend
- Create responsive design and hamburger menu icon
- Pull in API data from MongoDB Atlas
- Organize API data
- Deploy application via Netlify
- Use Bootstrap to improve UX and UI for frontend

#### PostMVP 

- Social media icons

## Functional Components

Based on the initial logic defined in the previous sections, the logic is broken down further into functional components.

#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Frontend Strutcure | H | 2hrs| 1hrs | 1hrs |
| Responsive Sesign | H | 4hrs | 2hrs | 2hrs|
| Connect Frontend & Backend | H | 2hrs| 2hrs |2hrs |
| Debugging & Testing | M | 8hrs| 8hrs | 8hrs |
| Application Deployment | H | 2hrs| 1hrs | 1hrs |
| Bootstrap | L | 8hrs| 8hrs |8hrs |
| Total | H | 26hrs| 22hrs | 22hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Scocial Media Icons | L | 2hrs | 0hrs | 0hrs|
| Total | H | 2hrs| 0hrs | 0hrs |

## Additional Libraries
This section lists all supporting libraries and thier role in the project. 

- jQuery is used for HTML DOM manipulation and event handling 

## Code Snippet

This code snippet was essential from the frontend becasue without it the CRUD functions would not be possible. The functions pulls data from the backend and appends it in table format to the frontend.

```
// Get all job rows
const getJob = async () => {
    // Gets the job rows
    const response = await fetch(`${URL}/job`);
    const data = await response.json();
    // Populate DOM with job rows
    data.forEach((job) => {
      // Make a new <tr> element
      const $tr = $('<tr>')
      // Add job info as <td> in the <tr>
      $tr.append($('<td>').text(`${job.company}`));
      $tr.append($('<td>').text(`${job.position}`));
      $tr.append($('<td>').text(`${job.location}`));
      $tr.append($('<td>').text(`${job.date}`));
      $tr.append($('<td>').text(`${job.phone}`));
      $tr.append($('<td>').text(`${job.onsite}`));
      $tr.append($('<td>').text(`${job.offer}`));
      const $updateButton = $('<button>').text("Update").addClass("update").attr("id", job._id).attr("data-toggle","modal").attr("data-target", "modal" + `${job._id}`);
      $tr.append($('<td>').append($updateButton));
      const $deleteButton = $('<button>').text("Delete").addClass("delete").attr("id", job._id);
      $tr.append($('<td>').append($deleteButton));
      $updateButton.on("click", () => {
          openModal(job)
      })
      $deleteButton.on("click", (event) => {
        deleteJob(event, job)
    })
      // Append the whole <tr> to the <tbody>
      $jobBody.append($tr)
    })
};
```

## Issues and Resolutions
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing ")" in jQuery line that appends table values 

**ERROR**: Bootstrap hamburger navigation did not toggle                               
**RESOLUTION**: Missing "ref" in the jQuery script
