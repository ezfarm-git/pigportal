Template.sharebox.onRendered(function () {

  //<![CDATA[
  // 사용할 앱의 JavaScript 키를 설정해 주세요.
  Kakao.init('e3aa1678788d2f6b66b63a1384d6b9c7');
  // 스토리 공유 버튼을 생성합니다.
  Kakao.Story.createShareButton({
    container: '#kakaostory-share-button',
    url: document.URL,
  });
  //]]>
});

Template.sharebox.events({
  'click .nv-share': function () {
    window.open('http://band.us/plugin/share?body=' + encodeURIComponent($('#summary').text()) + '&route=' + encodeURIComponent(document.URL),
      'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
    return false;
  },
  'click .kk-share': function () {
    window.open('https://story.kakao.com/s/share?url=' + encodeURIComponent(document.URL),
      'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=540');
    return false;
  },
  'click .fb-share': function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL),
      'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    return false;
  }
})
