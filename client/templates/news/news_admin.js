Template.news_admin.helpers({
    tableSetting: function() {
        return {
            collection: News,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: 'date', label: '일자', sortOrder: 0, sortDirection: 'descending' },
                { key: 'title', label: '제목' },
                { key: 'url', label: 'URL' },
                { key: 'category', label: '분류' }
            ]
        };
    }
});

Template.news_admin.events({
    'click .reactive-table tbody tr': function(evt,tmpl) {
        $('#postId').val(this._id);
        $('#date').val(this.date);
        $('#title').val(this.title);
        $('#url').val(this.url);
        $('#category').val(this.category);
        $('.addPost').text('Update Post').removeClass('addPost').addClass('updatePost');
    },
    'click .updatePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        var date = tmpl.find('#date').value;
        var title = tmpl.find('#title').value;
        var url = tmpl.find('#url').value;
        var category = tmpl.find('#category').value;
        Meteor.call('News.update', id, date, title, url, category);
    },
    'click .removePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        Meteor.call('News.remove', id);
    },
    'click .return': function(evt, tmpl) {
        $('.updatePost').text('Add Post').removeClass('updatePost').addClass('addPost');
        document.getElementById('Form').reset();
    }
});
