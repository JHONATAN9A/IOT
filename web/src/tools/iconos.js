import $ from "jquery";


$('#btn-ocultar-cards').on('click', function () {
    $('#fas-one')
        .find('[data-fa-i2svg]')
        .toggleClass('fa fa-caret-down')
        .toggleClass('fa fa-caret-up');
    
    
    $(".cards-data").animate({
        height: 'toggle'
    });
});