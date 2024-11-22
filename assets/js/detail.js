window.onload = function() {
  const location = window.location.href;
  const url = new URL(location);
  const search_params = new URLSearchParams(url.search);

  if(!search_params.has('id') || search_params.get('id') == "") {
    window.location.href = './';
  }

  fetch(`https://api.unsplash.com/photos/${search_params.get('id')}?client_id=${API_KEY}`).then(convert_to_json)
  .then(function (data) {
    loadDetail(data);

    document.getElementById('image_id').innerText = search_params.get('id');
  });
}

function loadDetail(data) {
  console.log(data);
  document.getElementById('detail_image').src = data.urls.regular;
  document.getElementById('detail_image').style.borderColor = data.color;
  document.getElementById('description_text').innerText = data.description;
  document.getElementById('username').innerText = data.user.username;
  document.getElementById('like_count').innerText = data.likes;
  document.getElementById('view_count').innerText = data.views;
  document.getElementById('alt_description').innerText = data.alt_description;
  // document.getElementById('image_color').style.backgroundColor = data.color;
  // document.getElementById('color_text').innerText = data.color;
  document.getElementById('download_link').href = data.links.download;
  

  
  
  const date = new Date(data.created_at);
  const upload_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  document.getElementById('upload_date').innerText = upload_date;


  // Modify the download button to download the image
  const downloadButton = document.getElementById('download_link');
  downloadButton.href = data.urls.full; // Full-resolution image
  downloadButton.download = `${data.id}.jpg`; // Suggests a default filename
  downloadButton.onclick = function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    downloadImage(data.urls.full, `${data.id}.jpg`);
  };
}

// Function to download the image
function downloadImage(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href); // Clean up
      
      // Show success alert
      alert("Download successful! Your image is now saved.");
    })
    .catch(error => {
      console.error(error);
      alert("Failed to download the image. Please try again.");
    });
}
