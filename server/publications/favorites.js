// for Admin
Meteor.publish("favoritesListAdmin", function() {
    return Favorites.find();
});

// for Viewer
Meteor.publish("favoritesList", function(category) {
    if (category === "total") {
        return Favorites.find({}, {sort: {name: 1}});
    } else {
        return Favorites.find({category: category}, {sort: {name: 1}});
    }
});

Meteor.publish("favoritesSummary", function() {
    return Favorites.find();
});
