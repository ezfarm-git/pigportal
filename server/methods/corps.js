Meteor.methods({
    'Corps.remove': function(id) {
        return Corps.remove({_id: id});
    }
});
