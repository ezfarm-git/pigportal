Template.header.onRendered(function () {

  $(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 225,
    hover: true,
    belowOrigin: true,
    alignment: 'right'
  });

  $(".button-collapse").sideNav();

  // $('.menu').on('click', function () {
  //   $('.navbar-collapse').collapse('hide');
  // });
  //
  // $(window).on('scroll', function () {
  //   if ($(this).scrollTop() < 400) {
  //     $('.navbar').fadeIn('slow');
  //   } else {
  //     $('.navbar').fadeOut('slow');
  //   }
  // });
});
