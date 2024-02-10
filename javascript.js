// Function to handle the "Download" button click
function openbox() {
    // Display the loading section
    document.getElementById("loading").style.display = "initial";
}

// Event listener for the "Download" button
document.getElementById("downloadBtn").addEventListener("click", function () {
    // Display the loading section
    document.getElementById("loading").style.display = "initial";

    // Get the input URL value
    var inputUrl = document.getElementById("inputUrl").value;

    // AJAX request to retrieve video information
    $.ajax({
        url: "https://theofficialvkr.xyz/data/trial.php?vkr=" + inputUrl,
        type: "GET",
        async: true,
        crossDomain: true,
        dataType: 'json',
        jsonp: true,
        cache: true,
        success: function (data) {
            // Handle successful response
            handleSuccessResponse(data);
        }
    });
});

// Function to handle successful AJAX response
function handleSuccessResponse(data) {
    // Display or hide elements based on the received data
    document.getElementById("container").style.display = "block";
    document.getElementById("loading").style.display = "none";

    // Check if the data is empty
    if (data.data) {
        // Extract video information from the data
        const videoData = data.data;

        // Update HTML elements with video information
        updateElement("thumb", videoData.thumb ? `<img src='${videoData.thumb}' width='300px'>` : "<img src='logo.png' width='300px'>");
        updateElement("title", videoData.title ? `<h1>${videoData.title}</h1>` : "");
        document.title = videoData.title ? `Download ${videoData.title} VKrDownloader` : "Download VKrDownloader";
        updateElement("description", videoData.description ? `<h3><details> <summary>View Description</summary>${videoData.description}</details></h3>` : "");
        updateElement("uploader", videoData.source ? `<h5>${videoData.source}</h5>` : "");
        updateElement("duration", videoData.duration ? `<h5>${videoData.duration}</h5>` : "");

        // Generate and display download buttons
        generateDownloadButtons(data);
    } else {
        alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
        document.getElementById("loading").style.display = "none";
    }
}

// Function to update HTML element content
function updateElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Function to generate download buttons
function generateDownloadButtons(data) {
    const downloadV = document.getElementById("download");
    downloadV.innerHTML = "";

    for (let i = 0; i <= 40; i++) {
        if (data["dl" + i]["url"]) {
            const myParam = ` - ${getParameterByName('itag', formats[i].url)}`;
            const bgcol = getBackgroundColor(myParam);
            const downloadUrl = data["dl" + i].url;
            downloadV.innerHTML += `<a href='${downloadUrl}'><button class='dlbtn'>Download Video ${i}</button></a>`;
        }
    }
function getBackgroundColor(myParam) {
    const greenFormats = [" - 17", " - 18", " - 22"];
    const blueFormats = [" - 139", " - 140", " - 141", " - 249", " - 250", " - 251", " - 599", " - 600"];

    if (greenFormats.includes(myParam)) {
        return "green";
    } else if (blueFormats.includes(myParam)) {
        return "#3800ff";
    } else {
        return "red";
    }
}
    // If no download links found
    if (downloadV.innerHTML === "") {
        alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
        document.getElementById("container").style.display = "none";
        location.href = "https://vkrfork.vercel.app/data/download.php?vkr=" + inputUrl;
    }
                      }
    
