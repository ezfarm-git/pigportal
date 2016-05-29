Template.focus_post.helpers({
    postId: function() {
        return FlowRouter.getParam('postId');
    },
    doc: function() {
        var postId = FlowRouter.getParam('postId');
        return Focus.find({_id:postId});
    },
    image: function(postId) {
        var imageId = Images.findOne({_id: postId})._id;
        return Images.find({_id: imageId});
    },
    images: function() {
        return Images.find();
    }
});
