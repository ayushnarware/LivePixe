let currentPage = 1; // Track the current page for API pagination

window.onload = function () {
  const location = window.location.href;
  const url = new URL(location);
  const search_params = new URLSearchParams(url.search);

  if (!search_params.has('q') || search_params.get('q') == "") {
    window.location.href = './';
  }

  const query = search_params.get('q');
  fetchAndGenerateCards(query);

  // Set initial values in the UI
  document.getElementsByName('q')[0].value = query;
  document.getElementById('search_query').innerText = query;

  // Add event listener to "Load More" button
  const loadMoreButton = document.getElementById('load_more');
  loadMoreButton.addEventListener('click', function () {
    fetchAndGenerateCards(query);
  });
};

function fetchAndGenerateCards(query) {
  const API_URL = `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=30&query=${query}&client_id=${API_KEY}`;
  fetch(API_URL)
    .then(response => response.json())
    .then(function (data) {
      generateCards(data.results);
      currentPage++; // Increment the page for the next request
    })
    .catch(error => console.error('Error fetching data:', error));
}

function generateCards(data) {
  console.log(data);
  const container = document.getElementById('result_container');
  const fragment = document.createDocumentFragment(); // Use a fragment for performance
  for (let i = 0; i < data.length; i++) {
    const single_item = data[i];
    const card = document.createElement('div');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    card.classList.add('item');
    anchor.href = `./detail.html?id=${single_item.id}`;
    card.style.backgroundColor = single_item.color;
    img.src = single_item.urls.thumb;
    img.alt = single_item.description || 'Unsplash Image';

    anchor.appendChild(img);
    card.appendChild(anchor);
    fragment.appendChild(card);
  }
  container.appendChild(fragment);
}
// // Updated detail.js
// window.onload = function () {
//   const location = window.location.href;
//   const url = new URL(location);
//   const search_params = new URLSearchParams(url.search);

//   if (!search_params.has('id') || search_params.get('id') === "") {
//     window.location.href = './';
//   }

//   const imageId = search_params.get('id');

//   // Fetch image details
//   fetch(`https://api.unsplash.com/photos/${imageId}?client_id=${API_KEY}`)
//     .then(convert_to_json)
//     .then(function (data) {
//       loadDetail(data);
//       document.getElementById('image_id').innerText = imageId;
//     });

//   // Add event listener for Similar Images button
//   const similarImagesButton = document.getElementById('similar_images_button');
//   similarImagesButton.addEventListener('click', function () {
//     fetchSimilarImages(imageId);
//   });
// };

// function loadDetail(data) {
//   console.log(data);
//   document.getElementById('detail_image').src = data.urls.regular;
//   document.getElementById('detail_image').style.borderColor = data.color;
//   document.getElementById('description_text').innerText = data.description;
//   document.getElementById('username').innerText = data.user.username;
//   document.getElementById('like_count').innerText = data.likes;
//   document.getElementById('view_count').innerText = data.views;
//   document.getElementById('alt_description').innerText = data.alt_description;
//   document.getElementById('download_link').href = data.links.download;

//   const date = new Date(data.created_at);
//   const upload_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
//   document.getElementById('upload_date').innerText = upload_date;

//   // Modify the download button to download the image
//   const downloadButton = document.getElementById('download_link');
//   downloadButton.href = data.urls.full; // Full-resolution image
//   downloadButton.download = `${data.id}.jpg`; // Suggests a default filename
//   downloadButton.onclick = function (event) {
//     event.preventDefault(); // Prevent default anchor behavior
//     downloadImage(data.urls.full, `${data.id}.jpg`);
//   };
// }

// function fetchSimilarImages(imageId) {
//   const API_URL = `https://api.unsplash.com/photos/${imageId}/related?client_id=${API_KEY}`;

//   fetch(API_URL)
//     .then(response => response.json())
//     .then(function (data) {
//       displaySimilarImages(data.results);
//     })
//     .catch(error => console.error('Error fetching similar images:', error));
// }

// function displaySimilarImages(images) {
//   const container = document.getElementById('similar_images_container');
//   container.innerHTML = ''; // Clear previous content
//   const fragment = document.createDocumentFragment();

//   images.forEach(image => {
//     const card = document.createElement('div');
//     const anchor = document.createElement('a');
//     const img = document.createElement('img');

//     card.classList.add('item');
//     anchor.href = `./detail.html?id=${image.id}`;
//     card.style.backgroundColor = image.color;
//     img.src = image.urls.thumb;
//     img.alt = image.description || 'Unsplash Image';

//     anchor.appendChild(img);
//     card.appendChild(anchor);
//     fragment.appendChild(card);
//   });

//   container.appendChild(fragment);
// }

// function downloadImage(url, filename) {
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => {
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = filename;
//       link.click();
//       URL.revokeObjectURL(link.href); // Clean up

//       // Show success alert
//       alert("Download successful! Your image is now saved.");
//     })
//     .catch(error => {
//       console.error(error);
//       alert("Failed to download the image. Please try again.");
//     });
// }
