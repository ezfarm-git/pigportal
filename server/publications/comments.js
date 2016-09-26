Meteor.publish("commentsList", function() {
  return Comments.find();
});
