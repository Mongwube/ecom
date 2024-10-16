var swiper = new Swiper('.fade', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay:{
        delay: 2500,
        disableOnInteraction: false
    }
})

// Swiper code for the catalog slide
const catSwiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    // effect: 'slide',
    autoplay:{
        delay: 2000,
        disableOnInteraction: false
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    //responsive breakpoints
    breakpoints:{
        0 : {
            slidesPerView: 1
        },
        620 : {
            slidesPerView: 2
        },
        1024 : {
            slidesPerView: 3
        },
    }
  });