Template.infographic_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.selectedImage = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

Template.infographic_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.selectedImage.set(null);
    this.formType.set(null);
});

Template.infographic_admin.helpers({
    tableSetting: function() {
        return {
            collection: Infographic,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            fields: ['date', 'title', 'summary', 'category']
        };
    },
    selectedDoc: function() {
        return Infographic.findOne(Template.instance().selectedDoc.get());
    },
    selectedImage: function() {
        return Template.instance().selectedImage.get();
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.infographic_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        $('#postId').val(this._id);
        $('#imageId').val(this.image);
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.selectedImage.set(this.image);
        tmpl.formType.set("update");
        // $('.submit-btn').text('Edit').removeClass('submit-btn').addClass('edit-btn');
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        var imageId = tmpl.selectedImage.get();
        Meteor.call('Infographic.remove', postId);
        Meteor.call('Images.remove', imageId);
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImage.set("");
        tmpl.formType.set("insert");
    },
    'click .reset-btn': function(evt, tmpl) {
        evt.preventDefault();
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImage.set("");
        tmpl.formType.set("insert");
    }
});
