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
            $('.nav-footer').animate({left:'0'},1050)
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
            $('.nav-footer').animate({left:'-250px'},50)
        $('.close').animate({
            left: '0px'
        })
        $('#openBtn').removeClass('d-none');
        $('#closeBtn').addClass('d-none');
}


searchBtn.addEventListener('click',()=>{
    searchBox.classList.replace('d-none','d-block')
    mainMeals.classList.add('d-none')
    $('.contact').css('display','none')
    closeBtn()
})

function openContact(){
    $('.contact').css('display','block')
    searchBox.classList.replace('d-block','d-none')
    mainMeals.classList.add('d-none')
    closeBtn()
}
$(document).ready( ()=>{
    searchByName('').then( ()=>{
        $('.loading .spinner').fadeOut(500,()=>{
        $('.loading').fadeOut(1000,()=>{
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
    mainMeals.classList.replace('d-none','d-block')
    
    console.log(response.meals);

}
async function searchByFLitter(term) {
    rowData.innerHTML = ""

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    mainMeals.classList.replace('d-none','d-block')

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
async function getArea(){
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);
    displayArea(response.meals)
}
function displayArea(arr){
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 text-white">
                    <div class="inner text-center ">
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
                    <div class="inner ">
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
                    <div class="inner text-white text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="mt-1">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartoona
}
showCat.addEventListener('click',()=>{
    getCategories()
    closeBtn()

})
showArea.addEventListener('click',()=>{
    getArea()
    closeBtn()

})
showIngredients.addEventListener('click',()=>{
    getIngredients()
    closeBtn()

})