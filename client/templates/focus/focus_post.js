Template.focus_post.helpers({
    postId: function() {
        return FlowRouter.getParam('postId');
    },
    doc: function() {
        var postId = FlowRouter.getParam('postId');
        return Focus.find({_id:postId});
    }
});
