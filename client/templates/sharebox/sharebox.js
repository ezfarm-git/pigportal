Template.sharebox.onRendered(function () {

  Kakao.Story.createShareButton({
    container: '#kakaostory-share-button',
    url: document.URL,
    text: $('#summary').text()
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
