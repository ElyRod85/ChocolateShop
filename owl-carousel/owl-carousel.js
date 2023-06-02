$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      loop: true,
      autoplay: false,
      margin: 10,
      nav: true,
      responsiveClass: true,
      responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1024: {
            items: 3
          },
          1366: {
            items: 4
          },
          1400: {
            items: 5
          }
      }
  });
  $( ".owl-prev").html('<i class="fa-solid fa-arrow-left"></i>');
  $( ".owl-next").html('<i class="fa-solid fa-arrow-right"></i>');
});


