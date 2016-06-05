Template.focus_post.helpers({
    post: function() {
        var postId = this.postId;
        return Focus.find({_id: postId}).fetch()[0];
    }
});
