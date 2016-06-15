Template.favorites_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.selectedImage = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

Template.favorites_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.selectedImage.set(null);
    this.formType.set(null);
});

Template.favorites_admin.helpers({
    tableSetting: function() {
        return {
            collection: Favorites,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            fields: [
                { key: 'name', label: '이름', sortOrder: 0, sortDirection: 'ascending' },
                { key: 'url', label: 'URL' },
                { key: 'category', label: '분류', sortOrder: 1, sortDirection: 'ascending' }
            ]
        };
    },
    selectedDoc: function() {
        return Favorites.findOne(Template.instance().selectedDoc.get());
    },
    selectedImage: function() {
        return Template.instance().selectedImage.get();
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.favorites_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        $('#postId').val(this._id);
        $('#imageId').val(this.image);
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.selectedImage.set(this.image);
        tmpl.formType.set("update");
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        var imageId = tmpl.selectedImage.get();
        Meteor.call('Favorites.remove', postId);
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
