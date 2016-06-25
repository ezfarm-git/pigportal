Template.news_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

Template.news_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.formType.set(null);
});

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
    },
    selectedDoc: function() {
        return News.findOne(Template.instance().selectedDoc.get());
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.news_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.formType.set("update");
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        Meteor.call('News.remove', postId);
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.formType.set("insert");
    },
    'click .reset-btn': function(evt, tmpl) {
        evt.preventDefault();
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.formType.set("insert");
    }
});
