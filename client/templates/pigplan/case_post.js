Template.case_post.helpers({
  post: function () {
    var postId = this.postId;
    return Case.find({
      _id: postId
    }).fetch()[0];
  }
});
