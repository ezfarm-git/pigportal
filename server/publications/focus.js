// for Admin
Meteor.publish("focusListAdmin", function() {
    return Focus.find();
});

// for Viewer
Meteor.publish("focusList", function() {
    return Focus.find();
});

Meteor.publish("categoryFocusList", function() {
    return Focus.find();
});

Meteor.publish("focusPost", function(postId) {
    return Focus.find({_id:postId});
});

Meteor.publish("focusImage", function(postId) {
    var imageId = Images.findOne({_id: postId})._id;
    return Images.find({_id: imageId});
});
