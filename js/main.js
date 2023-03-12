let events = [];
let initActiveMenu = function(topMenu, activeClass) {
  let menuItems = $(topMenu).find("a"),
    topMenuHeight = $(topMenu).outerHeight() + $(topMenu).outerHeight(),
    scrollItems = menuItems.map(function() {
      if ($(this).attr('href') !== '#') {
        let item = $($(this).attr("href"));
        if (item.length) return item;
      }
    });

  events.push(function() {
    let fromTop = $(this).scrollTop() + topMenuHeight;

    let cur = scrollItems.map(function(v, i) {
      if ($(this).offset().top < fromTop) return this;
    });

    cur = cur[cur.length - 1] || scrollItems[0];
    let id = cur && cur.length ? cur[0].id : "";

    menuItems.removeClass(activeClass).filter("[href='#" + id + "']").addClass(activeClass);
  })

  if (events.length == 1) {
    $(window).scroll(function() {
      events.forEach(function(event) {
        event()
      })
    })
  }
}

initActiveMenu('.header__list', 'header__link--active');
initActiveMenu('.popup__list', 'popup__link--active');


var infoSlider = null;
var mediaQuerySize = 1024;

function catalogSliderInit() {
  if (!infoSlider) {
    infoSlider = new Swiper('.info__wrap', {
      slidesPerView: 1,
      pagination: {
        el: ".info .swiper-pagination",
        clickable: true,
      },
    });
    infoSlider.on('slideChange', function() {
      $('.info__current').text(infoSlider.activeIndex + 1);
    });
  }
}

function catalogSliderDestroy() {
  if (infoSlider) {
    infoSlider.destroy();
    infoSlider = null;
  }
}

$(window).on('load resize', function() {
  let windowWidth = $(this).outerWidth();
  if ($('.info').length > 0) {
    if (windowWidth < mediaQuerySize) {
      catalogSliderInit()
    } else {
      catalogSliderDestroy()
    }
  }

});

$(window).on('load resize', function() {

  let windowWidth = $(this).outerWidth();
  let factoringSlider = null;

  if ($('.factoring').length > 0) {

    if (windowWidth < mediaQuerySize) {
      factoringSlider = new Swiper(".factoring__holder", {
        pagination: {
          el: ".factoring .swiper-pagination",
          clickable: true,
        },
      });

      factoringSlider.slideTo(0);
    } else {
      factoringSlider = new Swiper(".factoring__holder", {
        pagination: {
          el: ".factoring .swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

    }
    factoringSlider.on('slideChange', function() {
      $('.factoring__current').text(factoringSlider.activeIndex + 1);
    });
    factoringSlider.on('resize', function() {
      factoringSlider.slideTo(0);
    })
  }
})


$('#c_name, #c_phone, #c_msg').on('focus', function() {
  $(this).prev().addClass('label-active');
});

$('#c_name, #c_phone, #c_msg').on('blur', function() {
  if ($(this).val() == '') {
    $(this).prev().removeClass('label-active');
  }
});

$(document).ready(function() {
  let itemsFactoring = $('.factoring__holder .swiper-slide');
  $('.factoring__total').text(itemsFactoring.length);
  let itemsInfo = $('.info__wrap .swiper-slide');
  $('.info__total').text(itemsInfo.length);
})


$(document).on('click', '.popup__link', function() {
  $('.popup--menu').removeClass('active');
});

$(document).on('click', '.header__link, .popup__link, .contacts__link', function() {
  let target = $(this).attr('href');
  let coordsScroll = $(target).offset().top - $('.header').outerHeight()
  $('html, body').animate({
    scrollTop: coordsScroll
  }, 800);
  return false;
});


function fixContrastBg() {
  let $fixedMenu = $('.header');
  if ($fixedMenu.outerHeight() < $(window).scrollTop()) {
    $fixedMenu.addClass('header-control');
  } else {
    $fixedMenu.removeClass('header-control');
  }
}

fixContrastBg();

$(window).scroll(function() {
  fixContrastBg()
});

$(document).on('click', '.header .nav__toggle', function() {
  $('.popup--menu').addClass('active');
})

$(document).on('click', '.popup .nav__toggle', function() {
  $('.popup--menu').removeClass('active');
})

$('.btn').click(function() {
  $('html, body').animate({
    scrollTop: $('#callback').offset().top - $('.header').outerHeight()
  }, 700);
});
