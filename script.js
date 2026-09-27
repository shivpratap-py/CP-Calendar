
console.log("hi")

// Difference Between async and sync is that in the sync each lines gets executed one by one which can make our site unresponsive
// Async make the specific function to excute while the other can also get executed and will not have to wait


// Fetching the API of codeforces and extracting the values which i need 
// async functions because await can only be used in async func
async function apifetch() {
    // Fecthing api 
    let v = await fetch("https://codeforces.com/api/contest.list")
    // Storing the data int json format 
    let data = await v.json()

    console.log(data.result.length);
    console.log(data.result[0]);
    console.log(data.result[0].id);
    console.log(data.result[0].name);
    console.log(data.result[0].durationSeconds / 60 / 60 + " Hrs");

    const timestamp = data.result[0].startTimeSeconds
    const date = new Date(timestamp * 1000);
    console.log(date);

    return data;
}


// Function to find the next contest
function nextFunc(data) {

    // Getting all the upcoming contests
    let nextContest = data.result.filter(contest => contest.phase === "BEFORE")

    // Sorting the contests according to their starting time
    nextContest.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)

    // Returning only the closest contest
    return nextContest[0];
}


function display(data){
    // Getting the latest contest 

    // Link Of the Contest 
    const contestLink = `https://codeforces.com/contest/${data.id}`;

    // using DOM to get all the classes and id  
    let name = document.querySelector("#name")
    let duration = document.querySelector("#duration")
    let dateid = document.querySelector("#date")
    let link = document.querySelector("#registerBtn")

    // Converting startimg second to miliscond and then using date function 
    const timestamp = data.startTimeSeconds
    const date = new Date(timestamp * 1000);

    // Changing the inner HTML of the html file 
    link.href = contestLink;
    name.innerHTML = data.name;
    duration.innerHTML = "Duration : " + data.durationSeconds/60/60 + " Hrs";
    dateid.innerHTML = date.toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

// A main function to call the apifetch func 
async function main(){
    const data = await apifetch()
    const nextContest = nextFunc(data)
    display(nextContest)
}
main()
