window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
        })
    })
})

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 700,
        pauseOnDotsHover: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
    });

    //Mask

    $("input[name=phone]").mask("+7 (999) 999-99-99"); 

    // PageUp

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Плавный скролл

    $("a[href=#up], a[href=#advantages], a[href=#work], a[href=#shop], a[href=#plan], a[href=#review], a[href=#contacts]").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    

    //Modal

    $('.modal__close').on('click', function() {
        $('.overlay, #order, #thanks').fadeOut();
    });
  
    $('.button_more').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.price__title').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        });
    });

    //Validate

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "*Введите ваше имя",
                    minlength: jQuery.validator.format("*Введите {0} символа!")
                  },
                phone: "*Введите ваш номер телефона",
                email: {
                    required: "*Введите ваш email",
                    email: "*Неправильно введен адрес почты"
                }
            }
        });
    };
    validateForms('#order form');
    
    

        $('form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#order').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
    
                $('form').trigger('reset');
            });
            return false;
        });

});

