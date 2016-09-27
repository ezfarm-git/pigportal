Meteor.methods({
    'Comments.remove': function(id) {
        return Comments.remove({_id: id});
    }
});
