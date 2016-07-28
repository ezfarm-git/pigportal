Template.corps_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.selectedImage = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

Template.corps_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.selectedImage.set(null);
    this.formType.set(null);
});

Template.corps_admin.helpers({
    tableSetting: function() {
        return {
            collection: Corps,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: 'date', label: '일자', sortOrder: 0, sortDirection: 'descending' },
                { key: 'title', label: '제목' },
                { key: 'summary', label: '요약' }
            ]
        };
    },
    selectedDoc: function() {
        return Corps.findOne(Template.instance().selectedDoc.get());
    },
    selectedImage: function() {
        return Template.instance().selectedImage.get();
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.corps_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.selectedImage.set(this.image);
        tmpl.formType.set("update");
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        var imageId = tmpl.selectedImage.get();
        Meteor.call('Corps.remove', postId);
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
