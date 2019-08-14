$(document).ready(function () {
    // $('.btn').on('click', function (e) {
    //     e.preventDefault();
    //     if ($(this).closest('.ba--menu')) {
    //         $('.ba-menu-list').removeClass('visually-hidden');
    //     }
    // });

    $('.ba-gallery__img').on('click', function (e) {
        var $imgSrc = $(this).attr('src');
        var $modalImage = $('<img>'); //create element
        $modalImage.attr('src', $imgSrc).addClass('modal__image');
        $('.modal-content-wrapper').append($modalImage);
        openModal();
    });

    var openModal = function () {
        $('.modal').show();

        $(document).on('keydown', function (e) {
            if (e.keyCode == 27) {
                closeModal();
            }
        })
    }
    var closeModal = function () {
        $('.modal').hide();
        $('.modal-content-wrapper').empty();
    }

    $('.modal-close').on('click', function (e) {
        closeModal();
    });


    $('.modal').mouseup(function (e) { // событие клика по веб-документу
        var div = $('.modal-content'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            closeModal(); // скрываем его
        }
    });

    // var animateBlock= $('.sc-animate');
    // $(window).on('scroll', function(e){
    //     if($(this).scrollTop() >  ( animateBlock.offset().top - animateBlock.height()) - 250 )  {
    //         animateBlock.removeClass('sc-animate');
    //     };
    // })

    new WOW().init();

    $('.ba-category-wrapper').masonry({
        // options
        itemSelector: '.ba-category-item'
    });

    // init Isotope
    $('.ba-category-wrapper').isotope({
    });
    var filters = [];
    // filter items on button click
    $('.ba-category-nav-item').on('click', 'button', function () {
        $(this).toggleClass('active');
        var isChecked = $(this).hasClass('active'),
            filter = $(this).attr('data-filter');

        if (isChecked) {
            addFilter(filter)
        }
        else {
            removeFilter(filter)
        }

        $('.ba-category-wrapper').isotope({
            filter: filters.join(',')
        });

    });

    function addFilter(filter) {
        if (filters.indexOf(filter) == -1) {
            filters.push(filter);

        }
    }

    function removeFilter(filter) {
        var index = filters.indexOf(filter);
        if (index != 1) {
            filters.splice(index, 1);
        }
    }
    //slider

    $('.ba-slider').slick({
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 1500,
        infinite: true,
        dots: true,
        appendDots: '.slider-nav',
        centerMode: true,

    });

    // On before slide change

    var spanCurrentSlide = $('#currentSlide');
    $('.ba-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        spanCurrentSlide.text(nextSlide + 1);

    });

    $('#next').on('click', function () {
        $('.ba-slider').slick('slickNext');
    })
    $('#prev').on('click', function () {

        $('.ba-slider').slick('slickPrev');
    })
    $('#play').on('click', function () {
        $('.ba-slider').slick('slickPlay');
    })
    $('#pause').on('click', function () {
        $('.ba-slider').slick('slickPause');
    })


    $('#changeSlide').on('change', function () {
        $('.ba-slider').slick('slickGoTo', $(this).val() - 1);
    })

});

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.06693, lng: 36.237155},
        zoom: 8,
    });
}
const googleMapsScript = document.createElement('script');
 googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBaSe6jdgxnsPBSc7pRB0_MlIoZSRm7aw8&callback=initMap';
 document.head.appendChild(googleMapsScript);