Template.case_post.onRendered(function () {

  // var postId = this.data.postId;
  //
  // Meteor.call('get.Case', postId, function (error, result) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     Session.set('case', result);
  //   }
  // });
  //
  // var imageId = Session.get('case').image;
  //
  // Meteor.call('get.Image', imageId, function (error, result) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     Session.set('image', result);
  //   }
  // });
  //
  // var imageFile = Session.get('image').original.name;
  // var imageURL = window.location.origin + "/cfs/files/Images/" + imageId + "/" + imageFile;
  // Session.set('imageURL', imageURL);
  // console.log(Session.get('imageURL'));
  //
  // DocHead.addLink(
  //   {rel: "canonical", href: window.location.href}
  // );
  // DocHead.setTitle(
  //   Session.get('case').title
  // );
  // DocHead.addMeta({
  //   name: "description",
  //   content: Session.get('case').summary
  // });
  // DocHead.addMeta({
  //   name: "og:type",
  //   content: "article"
  // });
  // DocHead.addMeta({
  //   name: "og:url",
  //   content: window.location.href
  // });
  // DocHead.addMeta({
  //   name: "og:title",
  //   content: Session.get('case').title
  // });
  // DocHead.addMeta({
  //   name: "og:description",
  //   content: Session.get('case').summary
  // });
  // DocHead.addMeta({
  //   name: "og:image",
  //   content: window.location.origin + "/cfs/files/Images/" + imageId + "/" + imageFile
  // });

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

})
