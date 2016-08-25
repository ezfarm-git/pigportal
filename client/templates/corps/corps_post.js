Template.corps_post.helpers({
  post: function () {
    var postId = this.postId;
    return Corps.find({
      _id: postId
    }).fetch()[0];
  }
});

Template.corps_post.events({
  'click .nv-share': function () {
    window.open('http://band.us/plugin/share?body=' + encodeURIComponent(Session.get('case').summary) + '&route=' + encodeURIComponent(window.location.href),
      'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
    return false;
  },
  'click .kk-share': function () {
    window.open('https://story.kakao.com/s/share?url=' + encodeURIComponent(window.location.href),
      'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=540');
    return false;
  },
  'click .fb-share': function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL),
      'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    return false;
  }
})
