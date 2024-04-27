let searchBtn = document.getElementById('searchBtn')
let searchBox = document.getElementById('search')
let mainMeals = document.getElementById('mainMeals')
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

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    mainMeals.classList.replace('d-none','d-block')
    console.log(response.meals);

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
