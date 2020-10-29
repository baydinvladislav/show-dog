const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');


// Create a handly fetch's launcher
function fetchData (url) {
  return fetch(url)
           .then(checkStatus)
           .then(res => res.json())
           .catch(error => console.log('Smth went wrong', error))
}

// Combine all pomise, get list of breeeds and random image exactly breed
Promise.all([
  fetchData('https://dog.ceo/api/breeds/list')
  fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
  const breedList = data[0].message;
  const randomImage = data[1].message;
  
  generateOptions(breedList);
  generateImage(randomImage);
})

// Create a "checker"
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// Add to HTML list of breeds
function generateOptions(data) {
  const options = data.map(item => `
  <option value="${item}">${item}</option>
`).join('');
 select.innerHTML = options                                    
}

// Add to HTML random image
function generateImage(data) {
  const html = `
    <img src="${data}" alt>
    <p>Click to view images of ${select.value}s</p>
  `;
  card.innerHTML = html;
}

// Get image of exactly breed 
function fetchBreedImage(data) {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}s`
    })
  
}

// Add listeners for change value in dropdown list and get more image selected breed on the user's click
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);


