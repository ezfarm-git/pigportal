Template.sharebox.onRendered(function () {

  Kakao.Story.createShareButton({
    container: '#kakaostory-share-button',
    text: $('#summary').text(),
    url: document.URL
  });

  Kakao.Link.createTalkLinkButton({
    container: '#kakao-link-btn',
    label: $('h4').text(),
    image: {
      src: 'http://res.cloudinary.com/dvydtgalv/image/upload/v1472197539/mainBackground5_qcc7t0.jpg',
      width: '210',
      height: '140'
    },
    webButton: {
      text: $('#summary').text(),
      url: document.URL
    }
  });

});

Template.sharebox.events({
  'click .nv-share': function () {
    window.open('http://band.us/plugin/share?body=' + encodeURIComponent($('#summary').text()) +
      encodeURIComponent("\n") + encodeURIComponent(document.URL) +
      '&route=' + encodeURIComponent(document.URL),
      'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
    return false;
  },
  'click .kk-share': function () {
    window.open('https://story.kakao.com/s/share?url=' +
      encodeURIComponent(document.URL),
      'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=540');
    return false;
  },
  'click .fb-share': function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(document.URL),
      'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    return false;
  }
})
