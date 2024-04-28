let searchBtn = document.getElementById('searchBtn')
let searchBox = document.getElementById('search')
let mainMeals = document.getElementById('mainMeals')
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let showCat = document.getElementById("showCat");
let showArea = document.getElementById("showArea");
let showIngredients = document.getElementById("showIngredients");


function openBtn() {
    $('.side-nav').animate({
        width: '260px'
    })
    for (let i = 0; i < 5; i++) {
        $(".taps li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    $('.nav-footer').animate({
        left: '0'
    }, 1050)
    $('.close').animate({
        left: '260px'
    })
    $('#openBtn').addClass('d-none');
    $('#closeBtn').removeClass('d-none');
}

function closeBtn() {
    $('.side-nav').animate({
        width: '0px'
    })
    $(".taps li").animate({
        top: 300
    }, 500)
    $('.nav-footer').animate({
        left: '-250px'
    }, 50)
    $('.close').animate({
        left: '0px'
    })
    $('#openBtn').removeClass('d-none');
    $('#closeBtn').addClass('d-none');
}

searchBtn.addEventListener('click', () => {
    searchBox.classList.replace('d-none', 'd-block')
    mainMeals.classList.add('d-none')
    $('.contact').css('display', 'none')
    closeBtn()
})

$(document).ready(() => {
    searchByName('').then(() => {
            $('.loading').fadeOut(1000, () => {
                $('.loading').remove()
                $('body').css('overflow-y', 'auto')
            })
        })
    })

async function searchByName(term) {
    
    $('.loading-screen').fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $('.loading-screen').fadeOut(500)
    mainMeals.classList.replace('d-none', 'd-block')

    console.log(response.meals);

}
async function searchByFLitter(term) {
    
     $('.loading-screen').fadeIn(500)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
     $('.loading-screen').fadeOut(500)
    mainMeals.classList.replace('d-none', 'd-block')

}

function displayMeals(arr) {
    let mealsList = "";

    for (let i = 0; i < arr.length; i++) {
        mealsList += `
        <div class="col-md-3">
                    <div class="inner">
                        <div onclick="getMealDetails('${arr[i].idMeal}')" class="img position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                            <div class="cover position-absolute  d-flex align-items-center justify-content-center p-5">
                                <h2>${arr[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = mealsList
}

async function getCategories() {
    
     $('.loading-screen').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
     $('.loading-screen').fadeOut(500)

}
async function getArea() {
     $('.loading-screen').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);
    displayArea(response.meals)
     $('.loading-screen').fadeOut(500)
}

function displayArea(arr) {
    let areaList = "";
    for (let i = 0; i < arr.length; i++) {
        areaList += `<div class="col-md-3 text-white">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="inner text-center ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>`
    }
    rowData.innerHTML = areaList
}

function displayCategories(arr) {
    let categoriesList = "";

    for (let i = 0; i < arr.length; i++) {
        categoriesList += `
        <div class="col-md-3">
                    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="inner ">
                        <div class="img position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                            <div
                                class="cover position-absolute  d-flex flex-column align-items-center justify-content-center p-5">
                                <h2>${arr[i].strCategory}</h2>
                                <p>${arr[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = categoriesList
}
async function getIngredients() {
     $('.loading-screen').fadeIn(500)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
     $('.loading-screen').fadeOut(500)

}

function displayIngredients(arr) {
    let ingredientsList = "";

    for (let i = 0; i < arr.length; i++) {
        ingredientsList += `
        <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="inner text-white text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="mt-1">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = ingredientsList
}
showCat.addEventListener('click', () => {
    getCategories()
    closeBtn()
     $('.loading-screen').fadeIn(500)
    mainMeals.classList.replace('d-none', 'd-block')
    searchBox.classList.replace('d-block', 'd-none')
})
showArea.addEventListener('click', () => {
    getArea()
    closeBtn()
     $('.loading-screen').fadeIn(500)
    mainMeals.classList.replace('d-none', 'd-block')
    searchBox.classList.replace('d-block', 'd-none')

})
showIngredients.addEventListener('click', () => {
    getIngredients()
    closeBtn()
     $('.loading-screen').fadeIn(500)
    mainMeals.classList.replace('d-none', 'd-block')
    searchBox.classList.replace('d-block', 'd-none')

})

async function getCategoryMeals(category) {
    
     $('.loading-screen').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
     $('.loading-screen').fadeOut(500)

}

async function getAreaMeals(area) {
    
     $('.loading-screen').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
     $('.loading-screen').fadeOut(500)

}

async function getIngredientsMeals(ingredients) {
    
     $('.loading-screen').fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
     $('.loading-screen').fadeOut(500)
}

function openContact() {
    rowData.innerHTML = `<div class="col-md-6 ">
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="text" placeholder="Enter your name" id="inputName">
                    <div id="nameAlert" class="alert alert-danger mx-4 w-100 mx-4 d-none ">
                        Special characters and numbers not allowed
                    </div>
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="text" placeholder="Enter your phone" id="inputPhone">
                    <div id="phoneAlert" class="alert alert-danger mx-4 w-100  d-none">
                        Enter valid Phone Number
                    </div>
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="password" placeholder="Enter your password"
                        id="inputPassword">
                    <div id="passwordAlert" class="alert alert-danger mx-4 w-100  d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="email" placeholder="Enter your email" id="inputEmail">
                    <div id="emailAlert" class="alert alert-danger mx-4 w-100  d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="number" placeholder="Enter your age" id="inputAge">
                    <div id="ageAlert" class="alert alert-danger mx-4 w-100  d-none">
                        Enter valid age
                    </div>
                    <input class="form-control m-4" onkeyup="inputsValidation()" type="password" placeholder="Repeat our password"
                        id="inputRepPassword">
                    <div id="repasswordAlert" class="alert alert-danger mx-4 w-100  d-none">
                        Enter valid repassword
                    </div>
                </div>
                <div>
                    <button id="submitBtn" disabled class="btn btn-outline-danger px-2">Submit</button>
                </div>`

    let inputName = document.getElementById('inputName')
    let inputPhone = document.getElementById('inputPhone')
    let inputPassword = document.getElementById('inputPassword')
    let inputEmail = document.getElementById('inputEmail')
    let inputAge = document.getElementById('inputAge')
    let inputRepPassword = document.getElementById('inputRepPassword')
    inputName.addEventListener("focus", () => {
        nameInputTouched = true
    })

    inputEmail.addEventListener("focus", () => {
        emailInputTouched = true
    })

    inputPhone.addEventListener("focus", () => {
        phoneInputTouched = true
    })

    inputAge.addEventListener("focus", () => {
        ageInputTouched = true
    })

    inputPassword.addEventListener("focus", () => {
        passwordInputTouched = true
    })

    inputRepPassword.addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    // $('.contact').css('display', 'block')
    // searchBox.classList.replace('d-block', 'd-none')
    closeBtn()
     $('.loading-screen').fadeIn(500,()=>{
         $('.loading-screen').fadeOut(500)
     })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("inputName").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("inputEmail").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("inputPhone").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("inputAge").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("inputPassword").value))
}

function repasswordValidation() {
    return document.getElementById("inputRepPassword").value == document.getElementById("inputPassword").value
}

async function getMealDetails(mealId) {
    
    $('.loading-screen').fadeIn(500)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    searchBox.classList.replace('d-block', 'd-none')
    $('.loading-screen').fadeOut(500)
}

function displayMealDetails(meal) {
    
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags ?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let mealDetails = `
    <div class="col-md-4 text-white text-start">
                    <div class="inner">
                        <img class="w-100" src="${meal.strMealThumb}" alt="">
                        <h3>${meal.strMeal}</h3>

                    </div>
                </div>
                <div class="col-md-8 text-white text-start">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3>
                        <span class="fw-bolder">Category : </span>
                        ${meal.strCategory}
                    </h3>
                    <h3>
                        <span class="fw-bolder">Area : </span>
                        ${meal.strArea}
                    </h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                        
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                        
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

                </div>`

    rowData.innerHTML = mealDetails
}