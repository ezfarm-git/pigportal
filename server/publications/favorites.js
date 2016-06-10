// for Admin
Meteor.publish("favoritesListAdmin", function() {
    return Favorites.find();
});

// for Viewer
Meteor.publish("favoritesList", function(category) {
    if (category === "total") {
        return Favorites.find({}, {sort: {date: -1}});
    } else {
        return Favorites.find({category: category}, {sort: {date: -1}});
    }
});
