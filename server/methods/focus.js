Meteor.methods({
    'Focus.remove': function(id) {
        return Focus.remove({_id: id});
    },
    'get.Focus': function (id) {
      return Focus.find({_id: id}).fetch()[0];
    }
});
