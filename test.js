// JSON API
const deployedURL = "https://job-tracker-emestiza.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data.feed.entry)
        const jobs = data.feed.entry.map(entry => {
            return {
                company: entry.gsx$company.$t,
                position: entry.gsx$position.$t,
                location: entry.gsx$location.$t,
                date: entry.gsx$date.$t,
                phone: entry.gsx$phone.$t,
                onsite: entry.gsx$onsite.$t,
                offer: entry.gsx$offer.$t,
                url: entry.gsx$url.$t
             }
        })
        app(jobs)
    })

const app = (data) => {
    console.log(data)

    const createProjectElement = (project) => {
        const $tr = $('<tr>').addClass("project")
        $tr.append($('<td>').text(project.company))
        $tr.append($('<td>').text(project.position))
        $tr.append($('<td>').text(project.location))
        $tr.append($('<td>').text(project.date))
        $tr.append($('<td>').text(project.phone))
        $tr.append($('<td>').text(project.onsite))
        $tr.append($('<td>').text(project.offer))
        $tr.append($('<td>').text(project.url))
        return $tr
    }
    
    data.forEach(project => {
        const $projectDiv = createProjectElement(project)
        $('#jobBody').append($projectDiv)  
    })
}

