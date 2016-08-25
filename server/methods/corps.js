Meteor.methods({
    'Corps.remove': function(id) {
        return Corps.remove({_id: id});
    },
    'get.Corps': function (id) {
      return Corps.find({_id: id}).fetch()[0];
    }
});
