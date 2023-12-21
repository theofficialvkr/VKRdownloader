$(document).ready(function () {
    let myurl = $("#inputUrl");
    let downloadBtn = $("#downloadBtn");

    downloadBtn.on("click", function () {
        let myParamV = myurl.val();

        if (myParamV) {
            $.ajax({
                url: "https://theofficialvkr.xyz/data/trial.php?vkr=" + myParamV,
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    if (data.status === "1") {
                        // Handle successful response
                        updateUI(data.data);
                    } else {
                        // Handle error response
                        alert("Error: Unable to get download link. Please check the URL and contact us on Social Media @TheOfficialVKr");
                    }
                },
                error: function () {
                    // Handle AJAX error
                    alert("Server down due to too many requests. Please contact us on Social Media @TheOfficialVKr");
                }
            });
        }
    });

    function updateUI(videoData) {
        // Update HTML elements based on videoData
        // ...

        // Example: Update title
        let titleV = $("#title");
        titleV.html("<h1>" + videoData.title + "</h1>");

        // Example: Update thumbnail
        let thumbV = $("#thumb");
        thumbV.html("<img src='" + videoData.thumb + "' width='300px'>");

        // ...
    }
});
