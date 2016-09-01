Template.favorites_summary.helpers({
    postsList: function() {
        return Favorites.find({}, {sort: {name: 1}});
    },
    tableSetting: function() {
        return {
            collection: Favorites,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
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
