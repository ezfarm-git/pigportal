Template.focus_admin.onCreated(function() {
    Session.set("FocusImageId", "");
    // Session.set("PostId", "");
});

Template.focus_admin.onDestroyed(function() {
    document.getElementById('PostForm').reset();
    Session.set("FocusImageId", null);
    // Session.set("PostId", null);
});

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
            fields: ['date', 'title', 'summary', 'category']
            // filters: ['date', 'category']
        };
    }
});

Template.focus_admin.events({
    'click .reactive-table tbody tr': function(evt,tmpl) {
        $('#postId').val(this._id);
        $('#imageId').val(this.image);
        $('#date').val(this.date);
        $('#title').val(this.title);
        $('#summary').val(this.summary);
        $('.note-editable').html(this.content);
        $('#category').val(this.category);
        $('.addPost').text('Update Post').removeClass('addPost').addClass('updatePost');
        Session.set("FocusImageId", this.image);
    },
    'click .updatePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        var image = tmpl.find('#imageId').value;
        var date = tmpl.find('#date').value;
        var title = tmpl.find('#title').value;
        var summary = tmpl.find('#summary').value;
        var content = $('.note-editable').html();
        var category = tmpl.find('#category').value;
        Meteor.call('Focus.update', id, date, title, summary, content, image, category);
        // var temp_imageId = Session.get("temp_imageId");
        // Meteor.call('Focus.imageUpdate', id, temp_imageId);
        $('.updatePost').text('Add Post').removeClass('updatePost').addClass('addPost');
        document.getElementById('PostForm').reset();
        Session.set("FocusImageId", "");
    },
    'click .removePost': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#postId').value;
        Meteor.call('Focus.remove', id);
        document.getElementById('PostForm').reset();
        Session.set("FocusImageId", "");
    },
    'click .reset': function(evt, tmpl) {
        Session.set("FocusImageId", "");
    },
    'click .return': function(evt, tmpl) {
        $('.updatePost').text('Add Post').removeClass('updatePost').addClass('addPost');
        document.getElementById('PostForm').reset();
        Session.set("FocusImageId", "");
    }
});
