Meteor.methods({
    'CardNews.remove': function(id) {
        return CardNews.remove({_id: id});
    }
});
