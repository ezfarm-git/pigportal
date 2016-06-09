Meteor.methods({
    'News.remove': function(id) {
        return News.remove({_id: id});
    }
});
