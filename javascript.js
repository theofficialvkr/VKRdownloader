document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('download-btn');
    const inputUrl = document.getElementById('input-url');
    const videoContainer = document.getElementById('video-container');
    const loadingSpinner = document.getElementById('loading');
    const retryCount = 3;  // Max retries for failed requests

    // Function to validate the URL
    function validateUrl(url) {
        const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|tiktok\.com|facebook\.com|dailymotion\.com|twitter\.com|vk\.com|soundcloud\.com|filmyzilla|vegamovies)/;
        return urlPattern.test(url);
    }

    // Function to show loading spinner
    function showLoading() {
        loadingSpinner.style.display = 'block';
        videoContainer.innerHTML = ''; // Clear previous video data
    }

    // Function to hide loading spinner
    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    // Function to fetch video data with retries
    async function fetchWithRetry(url, options = {}, retries = retryCount) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                console.warn(`Retrying... (${retries} attempts left)`);
                return await fetchWithRetry(url, options, retries - 1);
            } else {
                throw new Error('Max retries reached. Could not fetch the data.');
            }
        }
    }

    // Function to handle video data rendering
    function renderVideoData(data) {
        const { title, url, description, thumbnail, downloads, source } = data;

        let downloadButtonsHTML = downloads.map(format => {
            return `<a class="btn btn-success btn-block" href="${format.url}" target="_blank" style="background-color: ${getFormatColor(format.extension)}">
                        Download ${format.extension.toUpperCase()} (${format.size})
                    </a>`;
        }).join('');

        // Add YouTube-specific iframe if the video source is YouTube
        if (source.includes('youtube.com') || source.includes('youtu.be')) {
            downloadButtonsHTML += `
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=mp3&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=360&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=720&vkr=${source}'></iframe>
            <iframe style='border:0;outline:none;width:100%;max-height:45px;height:45px !important;' src='https://vkrdownloader.vercel.app/server/dlbtn.php?q=1080&vkr=${source}'></iframe>`;
        }

        const videoHTML = `
            <div class="video-details">
                <img src="${thumbnail}" alt="${title}" class="img-thumbnail mb-3" />
                <h4>${title}</h4>
                <p>${description || 'No description available'}</p>
                <div>${downloadButtonsHTML}</div>
            </div>
        `;

        videoContainer.innerHTML = videoHTML;
    }

    // Function to get button background color based on format extension
    function getFormatColor(extension) {
        switch (extension) {
            case 'mp4': return '#4CAF50';
            case 'mkv': return '#00BCD4';
            case 'webm': return '#FF9800';
            default: return '#9E9E9E';
        }
    }

    // Event listener for the download button
    downloadButton.addEventListener('click', async function () {
        const url = inputUrl.value.trim();

        // Validate the URL
        if (!validateUrl(url)) {
            alert('Please enter a valid video URL from supported platforms.');
            return;
        }

        showLoading();

        try {
            const apiUrl = `https://vkrdownloader.vercel.app/server?vkr=${encodeURIComponent(url)}`;
            const videoData = await fetchWithRetry(apiUrl);
            
            if (videoData && videoData.data) {
                renderVideoData(videoData.data);
            } else {
                alert('Failed to retrieve video data. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching video data:', error);
            alert('An error occurred while fetching the video. Please try again.');
        } finally {
            hideLoading();
        }
    });
});
