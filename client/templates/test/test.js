Template.test.onCreated(function () {

});

Template.test.onRendered(function () {
  $('.grid').isotope({
    itemSelector: '.grid-item',
    masonry: {
      columnWidth: 100
    }
  });
});

Template.test.helpers({

});
