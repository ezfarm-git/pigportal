Template.focus_admin.onCreated(function() {
    // this.selectedDoc = new ReactiveVar("");
    // this.selectedImage = new ReactiveVar("");
    // this.formType = new ReactiveVar("insert");
    Session.set("ImageId", "");
    Session.set("PostId", "");
});

Template.focus_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    // this.selectedDoc.set(null);
    // this.selectedImage.set(null);
    Session.set("ImageId", null);
    Session.set("PostId", null);
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
    },
    selectedDoc: function() {
        // return Focus.findOne(Template.instance().selectedDoc.get());
        return Focus.findOne(Session.get("PostId"));
    },
    selectedImage: function() {
        // return Template.instance().selectedImage.get();
        return Session.get("ImageId");
    },
    formType: function() {
        // if (Template.instance().selectedDoc.get()) {
        if (Session.get("PostId")) {
            return "update";
        } else {
            return "insert";
        }
    }
});

Template.focus_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        evt.preventDefault();
        $('#postId').val(this._id);
        $('#imageId').val(this.image);
        // $('#date').val(this.date);
        // $('#title').val(this.title);
        // $('#summary').val(this.summary);
        // $('.note-editable').html(this.content);
        // $('#category').val(this.category);
        // $('.addPost').text('Update Post').removeClass('addPost').addClass('updatePost');
        // tmpl.selectedDoc.set(this._id);
        // tmpl.selectedImage.set(this.image);
        // tmpl.formType.set("update");
        Session.set("PostId", this._id);
        Session.set("ImageId", this.image);
        $('.submit-btn').text('Edit').removeClass('submit-btn').addClass('edit-btn');
    },
    // 'click .updatePost': function(evt, tmpl) {
    //     evt.preventDefault();
    //     var id = tmpl.find('#postId').value;
    //     var image = tmpl.find('#imageId').value;
    //     var date = tmpl.find('#date').value;
    //     var title = tmpl.find('#title').value;
    //     var summary = tmpl.find('#summary').value;
    //     var content = $('.note-editable').html();
    //     var category = tmpl.find('#category').value;
    //     Meteor.call('Focus.update', id, date, title, summary, content, image, category);
    //     // var temp_imageId = Session.get("temp_imageId");
    //     // Meteor.call('Focus.imageUpdate', id, temp_imageId);
    //     $('.updatePost').text('Add Post').removeClass('updatePost').addClass('addPost');
    //     document.getElementById('Form').reset();
    //     Session.set("ImageId", "");
    // },
    // 'click .edit-btn': function() {
        // $('.edit-btn').text('Add').removeClass('edit-btn').addClass('submit-btn');
    // },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.find('#postId').value;
        var imageId = tmpl.find('#imageId').value;
        Meteor.call('Focus.remove', postId);
        Meteor.call('Images.remove', imageId);
        document.getElementById('Form').reset();
        // tmpl.selectedDoc.set(null);
        // tmpl.selectedImage.set(null);
        // tmpl.formType.set("insert");
        Session.set("PostId", null);
        Session.set("ImageId", null);
    },
    'click .reset-btn': function(evt, tmpl) {
        evt.preventDefault();
        document.getElementById('Form').reset();
        // tmpl.selectedDoc.set(null);
        // tmpl.selectedImage.set(null);
        // tmpl.formType.set("insert");
        Session.set("PostId", null);
        Session.set("ImageId", null);
    },
    'click .deleteImage': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.find('#postId').value;
        var imageId = tmpl.find('#imageId').value;
        Meteor.call('Focus.remove', postId);
        Meteor.call('Images.remove', imageId);
        document.getElementById('Form').reset();
        // tmpl.selectedDoc.set(null);
        // tmpl.selectedImage.set(null);
        // tmpl.formType.set("insert");
        Session.set("PostId", null);
        Session.set("ImageId", null);
    }
});
