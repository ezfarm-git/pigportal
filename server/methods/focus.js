Meteor.methods({
    'Focus.remove': function(id) {
        return Focus.remove({_id: id});
    }
});
