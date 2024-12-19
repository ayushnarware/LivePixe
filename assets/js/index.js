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
