Template.case_post.onRendered(function () {

  var postId = this.data.postId;

  Meteor.call('get.Case', postId, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('case', result);
    }
  });

  var imageId = Session.get('case').image;

  Meteor.call('get.Image', imageId, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('image', result);
    }
  });

  var imageFile = Session.get('image').original.name;

  DocHead.addLink(
    {rel: "canonical", href: window.location.href}
  );
  DocHead.setTitle(
    Session.get('case').title
  );
  DocHead.addMeta({
    name: "description",
    content: Session.get('case').summary
  });
  DocHead.addMeta({
    name: "og:type",
    content: "article"
  });
  DocHead.addMeta({
    name: "og:url",
    content: window.location.href
  });
  DocHead.addMeta({
    name: "og:title",
    content: Session.get('case').title
  });
  DocHead.addMeta({
    name: "og:description",
    content: Session.get('case').summary
  });
  DocHead.addMeta({
    name: "og:image",
    content: "http://210.92.91.212:3000/cfs/files/Images/" + imageId + "/" + imageFile
  });

  // $("meta[property='og:type']").attr('content', Session.get('case').title);

});

Template.case_post.helpers({
  post: function () {
    var postId = this.postId;
    return Case.find({
      _id: postId
    }).fetch()[0];
  }
});

Template.case_post.events({
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
