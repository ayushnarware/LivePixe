let currentPage = 1; // Track the current page for API pagination

window.onload = function () {
  fetchAndGenerateCards();

  // Add event listener to the "Load More" button
  const loadMoreButton = document.getElementById('load_more');
  loadMoreButton.addEventListener('click', function () {
    fetchAndGenerateCards();
  });
};

function fetchAndGenerateCards() {
  const API_URL = `https://api.unsplash.com/photos?page=${currentPage}&per_page=30&client_id=${API_KEY}`;
  fetch(API_URL)
    .then(response => response.json())
    .then(function (data) {
      generateCards(data);
      currentPage++; // Increment the page for the next request
    })
    .catch(error => console.error('Error fetching data:', error));
}

function generateCards(data) {
  console.log(data);
  const container = document.getElementById('image_container');
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
