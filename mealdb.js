const searchFood = async () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = " ";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  displaySearchResult(data.meals);

  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displaySearchResult(data.meals));
}


const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = "";

  meals.forEach(meal => {
    // console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div onClick="loadMealDetails(${meal.idMeal})" class="card h-100">
             <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
        </div>
       </div>
    `;
    searchResult.appendChild(div);
  })

}

const loadMealDetails = async mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0])

  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayMealDetails(data.meals[0]))
}


const displayMealDetails = meal => {
  console.log(meal)
  const mealDetails = document.getElementById('single-meal-details');
  mealDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card', 'mx-auto', 'w-25');
  div.innerHTML = `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
    <p class="card-text"><small class="text-muted">${meal.strCategory}</small></p>
    <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Click here</a>
  </div>
  `;
  mealDetails.appendChild(div);
}