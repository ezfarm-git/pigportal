Template.focus_post.onRendered(function() {
  // var postId = this.data.postId;
  //
  // Meteor.call('get.Focus', postId, function (error, result) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     Session.setPersistent('post', result);
  //   }
  // });
});

Template.focus_post.helpers({
  post: function () {
    var postId = this.postId;
    return Focus.find({
      _id: postId
    }).fetch()[0];
  }
});

Template.focus_post.events({
  // 'click .nv-share': function () {
  //   window.open('http://band.us/plugin/share?body=' + encodeURIComponent(Session.get('post').summary) + '&route=' + encodeURIComponent(document.URL),
  //     'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
  //   return false;
  // },
  // 'click .kk-share': function () {
  //   window.open('https://story.kakao.com/s/share?url=' + encodeURIComponent(document.URL),
  //     'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=540');
  //   return false;
  // },
  // 'click .fb-share': function () {
  //   window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL),
  //     'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
  //   return false;
  // }
})
