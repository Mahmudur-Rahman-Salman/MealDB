const searchFood = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = " ";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;


  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals));
}


const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
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

const loadMealDetails = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}


const displayMealDetails = meal => {
  console.log(meal)
  const mealDetails = document.getElementById('single-meal-details');
  const div = document.createElement('div');
  div.classList.add('card', 'mx-auto', 'w-50');
  div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
               <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="img">
       </div>
      <div class="col-md-8">
      <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
          <p class="card-text"><small class="text-muted">${meal.strCategory}</small></p>
      </div>
  </div>
</div>
  `;
  mealDetails.appendChild(div);
}