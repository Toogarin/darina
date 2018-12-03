$.fn.extend({
    // Define the threeBarToggle function by extending the jQuery object
    threeBarToggle: function(options){

        // Set the default options
        var defaults = {
            color: 'black',
            width: 30,
            height: 25,
            speed: 400,
            animate: true
        }
        var options = $.extend(defaults, options);

        return this.each(function(){
            $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
            $(this).addClass('tb-menu-toggle');
            $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
                event.preventDefault();
                $(this).toggleClass('tb-active-toggle');
                if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
                $('.tb-mobile-menu').css("display", function(_,val){
                    var content = $('#menu+.content')
                    if(!$(this).hasClass('active')){
                        content.css('width',content.width());
                        $(this).addClass('active');
                        $('html,body').css('overflow','hidden');
                        return "block"
                    }else{
                        $(this).removeClass('active');
                        $('html,body').css('overflow','');
                        content.css('width',''); 
                        return "block";
                    }
                });
            });
            $(this).children().css('background', options.color);
        });
    },

    // Define the accordionMenu() function that adds the sliding functionality
    accordionMenu: function(options){
        // Set the default options
        var defaults = {
            speed: 400
        }
        var options =  $.extend(defaults, options);

        return this.each(function(){
            $(this).addClass('tb-mobile-menu');
            var menuItems = $(this).children('li');
            menuItems.find('.sub-menu').parent().addClass('tb-parent');
            $('.tb-parent ul').hide();
            $('.tb-parent > a').on('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                $(this).siblings().slideToggle(options.speed);
            });

        });
    }
});
$('#menu-toggle').threeBarToggle({color: '#000', width: '1.5rem', height: '1.1rem'});
$('#menu').accordionMenu();

$(document).ready(function(){
    $(".slider-main").owlCarousel({
        items: 1,
        loop:true,
        nav:false,
        dots:true,
    });
    $(".slider-product .slider").owlCarousel({
        items: 6,
        loop:true,
        nav:true,
        dots:false,
        navText:['',''],
        responsive : {
            0 : {
                items: 1
            },
            450 : {
                items: 2
            },
            650 : {
                items: 3
            },
            950 : {
                items: 4
            },
            1250 : {
                items: 5
            },
            1600 : {
                items: 6
            }
        }
    });
    var slidersShowroom = $(".slider-showrooms .slider").owlCarousel({
        items: 1,
        loop: true,
        nav:true,
        dots:false,
        navText:['','']
    });
    $('.footer .top .title').click(function () {
        var next = $(this).next();
        if(next.hasClass('active')){
            next.removeClass('active');
        }else{
            next.addClass('active');
        }
    });
    $('.slider-showrooms .mobile_head').click(function () {
        var parent = $(this).parent();
        if(parent.hasClass('active')){
            parent.removeClass('active');
        }else{
            parent.addClass('active');
            slidersShowroom.trigger('refresh.owl.carousel');
        }
    });
    $('#menu .back').click(function () {
        $('#menu-toggle').click();
    })

    // Блок показа полоной новости
    var moreBlock = $('.news-content__more-block');
    $('.news-content__more').on('click',function (){
        moreBlock.slideUp();
        var curentBlock = $(this).next();
        if(curentBlock.is(':visible')){
            curentBlock.slideUp();
        }else{
            curentBlock.slideDown();
        }
    });


});

