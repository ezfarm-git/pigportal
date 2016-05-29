Template.focus_admin.helpers({
    tableSetting: function() {
        return {
            collection: Focus,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            // enableRegex: true,
            fields: ['date', 'title', 'summary', 'content', 'image', 'category']
            // filters: ['date', 'category']
        };
    }
});

Template.focus_admin.events({
    'click .reactive-table tbody tr': function(evt,tmpl) {
        $('#postId').val(this._id);
        $('#date').val(this.date);
        $('#title').val(this.title);
        $('#summary').val(this.summary);
        $('#content').val(this.content);
        $('#image').val(this.image);
        $('#category').val(this.category);
        $('.addPost').text('Update Post').removeClass('addPost').addClass('updatePost');
    },
    'click .updatePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        var date = tmpl.find('#date').value;
        var title = tmpl.find('#title').value;
        var summary = tmpl.find('#summary').value;
        var content = tmpl.find('#content').value;
        var image = tmpl.find('#image').value;
        var category = tmpl.find('#category').value;
        Meteor.call('Focus.update', id, date, title, summary, content, image, category);
    },
    'click .removePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        Meteor.call('Focus.remove', id);
    },
    'click .return': function(evt, tmpl) {
        $('.updatePost').text('Add Post').removeClass('updatePost').addClass('addPost');
        document.getElementById('PostForm').reset();
    }
});
