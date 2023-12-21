// VKrDownloader
document.getElementById("downloadBtn").addEventListener("click", () => {
    const myurl = document.getElementById("inputUrl").value;

    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return '.';
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    if (!myurl) {
        alert("Please enter a valid URL.");
        return;
    }

    // Loading
    document.getElementById("loading").style.display = "initial";

    $.ajax({
        url: "https://theofficialvkr.xyz/data/trial.php?vkr=" + myurl,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            const container = document.getElementById("container");
            const loading = document.getElementById("loading");

            // Hide loading
            loading.style.display = "none";

            if (!$.trim(data)) {
                alert("Issue: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
                return;
            }

            // Show container
            container.style.display = "block";

            // Extracted data
            const { title, thumbnail, description, uploader, duration, extractor, url, entries, formats, medias } = data;

            const thumbV = document.getElementById("thumb");
            const titleV = document.getElementById("title");
            const descriptionV = document.getElementById("description");
            const uploaderV = document.getElementById("uploader");
            const durationV = document.getElementById("duration");
            const extractorV = document.getElementById("extractor");
            const urlV = document.getElementById("downloadURL");
            const downloadV = document.getElementById("download");

            // Set thumbnail
            const VTHUMB = thumbnail ? thumbnail : 'logo.png';
            thumbV.innerHTML = `<img src='${VTHUMB}' width='300px'>`;

            // Set title
            titleV.innerHTML = title ? `<h1>${title}</h1>` : '';
            document.title = title ? `Download ${title} VKrDownloader` : '';

            // Set description
            descriptionV.innerHTML = description ? `<h3><details> <summary>View Description</summary>${description}</details></h3>` : '';

            // Set uploader
            uploaderV.innerHTML = uploader ? `<h5>${uploader}</h5>` : '';

            // Set duration
            durationV.innerHTML = duration ? `<h5>${duration}</h5>` : '';

            // Set extractor
            extractorV.innerHTML = extractor ? `<h5>${extractor}</h5>` : '';

            // Set URL
            urlV.innerHTML = url ? `<a href='${url}'><button class='dlbtn'>Video</button></a>` : '';

            if (thumbnail) {
                urlV.innerHTML += `<a href='${VTHUMB}'><button class='dlbtn'>Download Thumbnail </button></a>`;
            }

            // Handle entries
            if (entries) {
                urlV.innerHTML = `<a href='${entries[0].url}'><button class='dlbtn'>Download Video</button></a>`;
            }

            // Handle formats or medias
            else if (formats || medias) {
                const items = formats || medias;
                downloadV.innerHTML = items.map(item => {
                    const myParam = " - " + getParameterByName('itag', item.url);
                    let bgcol = '';

                    if ([" - 17", " - 18", " - 22"].includes(myParam)) {
                        bgcol = "green";
                    } else if ([" - 139", " - 140", " - 141", " - 249", " - 250", " - 251", " - 599", " - 600"].includes(myParam)) {
                        bgcol = "#3800ff";
                    }

                    return `<a href='${item.url}'><button style='background:${bgcol}' class='dlbtns'>${item.quality}${myParam}</button></a>`;
                }).join('');
            } else {
                alert("Server Down due to Too Many Requests. Please contact us on Social Media @TheOfficialVKr");
                container.style.display = "none";
                location.href = "https://vkrfork.vercel.app/data/download.php?vkr=" + myurl;
            }
        },
        error: function () {
            alert("Error occurred while fetching data. Please try again later.");
            document.getElementById("loading").style.display = "none";
        }
    });
});
