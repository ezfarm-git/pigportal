Template.focus_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.selectedImage = new ReactiveVar("");
    this.selectedFile = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

Template.focus_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.selectedImage.set(null);
    this.selectedFile.set(null);
    this.formType.set(null);
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
            fields: [
                { key: 'date', label: '일자', sortOrder: 0, sortDirection: 'descending' },
                { key: 'title', label: '제목' },
                { key: 'summary', label: '요약' },
                { key: 'category', label: '분류' }
            ]
        };
    },
    selectedDoc: function() {
        return Focus.findOne(Template.instance().selectedDoc.get());
    },
    selectedImage: function() {
        return Template.instance().selectedImage.get();
    },
    selectedFile: function() {
        return Template.instance().selectedFile.get();
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.focus_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.selectedImage.set(this.image);
        tmpl.selectedFile.set(this.file);
        tmpl.formType.set("update");
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        var imageId = tmpl.selectedImage.get();
        var fileId = tmpl.selectedFile.get();
        Meteor.call('Focus.remove', postId);
        Meteor.call('Images.remove', imageId);
        Meteor.call('Files.remove', fileId);
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImage.set("");
        tmpl.selectedFile.set("");
        tmpl.formType.set("insert");
    },
    'click .reset-btn': function(evt, tmpl) {
        evt.preventDefault();
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImage.set("");
        tmpl.selectedFile.set("");
        tmpl.formType.set("insert");
    }
});
