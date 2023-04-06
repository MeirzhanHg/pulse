$(document).ready(function() {
    // СОБЫТИЯ СЛАЙДЕРА
    $('.carousel__inner').slick({
        speed: 1000,
        adaptiveHeight: true,
        // autoplay: true,
        autoplaySpeed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/product/icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/product/icons/right.svg"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                dots: true,
            }
        }]

    });


    // СОБЫТИЯ ТАБОВ
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    // СОБЫТИЯ ПОДРОБНЕЕ И НАЗАД
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on("click", function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay,#consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order,#thanks').fadeOut('slow');
    });

    $('.button_min').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    function validForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        })
    };

    validForms('#consultation-form');
    validForms('#consultation form');
    validForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

});