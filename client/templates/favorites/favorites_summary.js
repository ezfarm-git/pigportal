Template.favorites_summary.helpers({
    postsList: function() {
        return Favorites.find({}, {sort: {name: 1}});
    },
    tableSetting: function() {
        return {
            collection: Favorites,
            showFilter: true,
            multiColumnSort: false,
            showNavigation: 'never',
            fields: [
                { key: 'name', label: ' ◎ 사이트', sortOrder: 0, headerClass: 'success' },
                { key: 'category', label: ' ◎ 카테고리', sortOrder: 1, headerClass: 'success' },
                { key: 'url', hidden: true }
            ]
        };
    }
});

Template.favorites_summary.events({
    'click .reactive-table tbody tr': function (evt) {
        evt.preventDefault();
        window.open(this.url);
    }
});
