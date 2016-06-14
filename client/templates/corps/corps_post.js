Template.corps_post.helpers({
    post: function() {
        var postId = this.postId;
        return Corps.find({_id: postId}).fetch()[0];
    }
});
