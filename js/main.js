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

function openContact() {
    $('.contact').css('display', 'block')
    searchBox.classList.replace('d-block', 'd-none')
    mainMeals.classList.add('d-none')
    closeBtn()
}
$(document).ready(() => {
    searchByName('').then(() => {
        $('.loading .spinner').fadeOut(500, () => {
            $('.loading').fadeOut(1000, () => {
                $('.loading').remove()
                $('body').css('overflow-y', 'auto')
            })
        })
    })
})

async function searchByName(term) {
    rowData.innerHTML = ""
    $('.loading').fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $('.loading').fadeOut(500)
    mainMeals.classList.replace('d-none', 'd-block')

    console.log(response.meals);

}
async function searchByFLitter(term) {
    rowData.innerHTML = ""

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    mainMeals.classList.replace('d-none', 'd-block')

}

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                    <div class="inner">
                        <div class="img position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                            <div class="cover position-absolute  d-flex align-items-center justify-content-center p-5">
                                <h2>${arr[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getCategories() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)

}
async function getArea() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);
    displayArea(response.meals)
}

function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 text-white">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="inner text-center ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>`
    }
    rowData.innerHTML = cartoona
}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
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

    rowData.innerHTML = cartoona
}
async function getIngredients() {
    rowData.innerHTML = ""

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="inner text-white text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="mt-1">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartoona
}
showCat.addEventListener('click', () => {
    getCategories()
    closeBtn()

})
showArea.addEventListener('click', () => {
    getArea()
    closeBtn()

})
showIngredients.addEventListener('click', () => {
    getIngredients()
    closeBtn()

})

async function getCategoryMeals(category) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}



async function getAreaMeals(area) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}
let submitBtn = document.getElementById('submitBtn')
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