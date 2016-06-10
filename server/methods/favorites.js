Meteor.methods({
    'Favorites.remove': function(id) {
        return Favorites.remove({_id: id});
    }
});
