const search = document.querySelector('#search'),
    submit = document.querySelector('#submit'),
    random = document.querySelector('#random'),
    mealsEl = document.querySelector('#meals'),
    resultHeading = document.querySelector('#result-heading'),
    single_mealEl = document.querySelector('#single-meal');;

    // Search meal and fetch from API
    function searchMeal(e){
        e.preventDefault();

        // Clear single meal
        single_mealEl.innerHTML = '';


        // Get search term
        const term = search.value;

        if(term.trim()){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

                if(data.meals === null){
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                }else{
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.StrMeal}" />
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('');
                }
            });

            //Clear search text
            search.value = '';
        }else{
            alert('Please enter a search term:')
        }
    }


    // Event Listeners
    submit.addEventListener('submit',searchMeal);