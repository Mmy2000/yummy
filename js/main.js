$('#openBtn').click( ()=>{
    $('.side-nav').animate({width:'260px'})
    $('.close').animate({left:'260px'})
    $('#openBtn').addClass('d-none');
    $('#closeBtn').removeClass('d-none');
})
$('#closeBtn').click( ()=>{
    $('.side-nav').animate({width:'0px'})
    $('.close').animate({left:'0px'})
    $('#openBtn').removeClass('d-none');
    $('#closeBtn').addClass('d-none');
})