const base = "https://improved-spork-7vgj457996v3xv45-6008.app.github.dev"; // replace with your actual backend URL

// Fetch and display countries
fetch(`${base}/countries`)
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector("#countriesTable tbody");
    tbody.innerHTML = ''; // Clear existing rows
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.country_id}</td>
          <td>${item.name}</td>
          <td>${item.population}</td>
          <td>${item.capital}</td>
          <td><img src="${item.flag_url}" alt="Flag" class="flag-img"></td>
        </tr>`;
    });
  })
  .catch(error => console.error('Error loading countries:', error));

// Fetch and display famous places
fetch(`${base}/famous_places`)
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector("#placesTable tbody");
    tbody.innerHTML = '';
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.place_id}</td>
          <td>${item.country_id}</td>
          <td>${item.name}</td>
          <td>${item.description || 'N/A'}</td>
        </tr>`;
    });
  })
  .catch(error => console.error('Error loading places:', error));

// Fetch and display major companies
fetch(`${base}/major_companies`)
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector("#companiesTable tbody");
    tbody.innerHTML = '';
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.company_id}</td>
          <td>${item.country_id}</td>
          <td>${item.name}</td>
          <td>${item.industry}</td>
        </tr>`;
    });
  })
  .catch(error => console.error('Error loading companies:', error));

// Fetch and display reviews
fetch(`${base}/reviews`)
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector("#reviewsTable tbody");
    tbody.innerHTML = '';
    data.forEach(item => {
      const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
      tbody.innerHTML += `
        <tr>
          <td>${item.review_id}</td>
          <td>${item.country_id}</td>
          <td>${item.user_name}</td>
          <td class="rating-stars">${stars}</td>
          <td>${item.review_text}</td>
        </tr>`;
    });
  })
  .catch(error => console.error('Error loading reviews:', error));