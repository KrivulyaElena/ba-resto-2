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

const googleMapsScript = document.createElement('script');
googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACjCFeZJB14g3WrR4zW9427PqV6OzSZqc&callback=initMap';
document.head.appendChild(googleMapsScript);

let map;
function initMap() {
    let mapZoom = 6;


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.06693, lng: 36.237155 },
        zoom: mapZoom,
    });

    let baOffices = [
        {
            city: 'Kharkiv',
            position: { lat: 50.0006693, lng: 36.237199 },
            img: 'images/cupcake.svg'

        },
        {
            city: 'Poltava',
            position: { lat: 49.588983, lng: 34.554741 },
            img: 'images/cupcake.svg'

        },
        {
            city: 'Kramatorsk',
            position: { lat: 48.9009301, lng: 36.5196854 },
            img: 'images/cupcake.svg'

        },
        {
            city: 'Kiev',
            position: { lat: 50.4637267, lng: 30.4977141 },
            img: 'images/cupcake.svg'

        },

        {
            city: 'Ivano-Frakkivsk',
            position: { lat: 49.917688, lng: 24.702575 },
            img: 'images/cupcake.svg'

        },
    ];

    baOffices.forEach(function (office) {
        var marker = new google.maps.Marker({
            position: office.position,
            map: map,
            title: office.city,
            icon: {
                url: office.img,
                size: new google.maps.Size(32, 32),

            }
        });
    })


    let restaurantSelect = document.querySelector('#choiceRestaurant');
    function addRestaurantToSelect() {
        baOffices.forEach(function (office) {
            let opt = document.createElement('option');
            opt.value = office.position.lat + ',' + office.position.lng;
            opt.innerText = office.city;
            restaurantSelect.appendChild(opt);
        })

    };

    addRestaurantToSelect();

    restaurantSelect.addEventListener('change', function () {
        let coordinate = this.value.split(',');
        center = new google.maps.LatLng(coordinate[0], coordinate[1]);
        map.panTo(center);
        map.setZoom(mapZoom + 3);

    })

}

let selects = document.querySelectorAll('.ba-select');

selects.forEach(function (select) {
    
    select.addEventListener('click', function () {
        var selectWrapper = this.parentNode;
        selectWrapper.classList.toggle('ba-select-wrap_active');
    });
    function selectDefault () {
        var selectWrapper = this.parentNode;
        selectWrapper.classList.remove('ba-select-wrap_active');
    };
   
    select.addEventListener('change', selectDefault);
    select.addEventListener('blur', selectDefault);


 
})

