$('#openBtn').click( ()=>{
    $('.side-nav').animate({width:'260px'},()=>{
        for (let i = 0; i < 5; i++) {
        $(".taps li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    })
    $('.close').animate({left:'260px'})
    $('#openBtn').addClass('d-none');
    $('#closeBtn').removeClass('d-none');
})
$('#closeBtn').click( ()=>{
    $('.side-nav').animate({width:'0px'},()=>{
        $(".taps li").animate({
        top: 300
    }, 500)
    })
    $('.close').animate({left:'0px'})
    $('#openBtn').removeClass('d-none');
    $('#closeBtn').addClass('d-none');
})