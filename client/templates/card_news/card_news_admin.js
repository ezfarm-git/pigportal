Template.card_news_admin.onCreated(function() {
    this.selectedDoc = new ReactiveVar("");
    this.selectedImages = new ReactiveVar("");
    this.formType = new ReactiveVar("insert");
});

// Template.card_news_admin.onRendered(function() {
//     var hooksObject = {
//         before: function() {
//
//         },
//         after: function() {
//
//         }
//     };
//     AutoForm.hooks({
//         "Form": hooksObject
//     });
// });

Template.card_news_admin.onDestroyed(function() {
    document.getElementById('Form').reset();
    this.selectedDoc.set(null);
    this.selectedImages.set(null);
    this.formType.set(null);
});

Template.card_news_admin.helpers({
    tableSetting: function() {
        return {
            collection: CardNews,
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
        return CardNews.findOne(Template.instance().selectedDoc.get());
    },
    selectedImages: function() {
        return Template.instance().selectedImages.get();
    },
    formType: function() {
        return Template.instance().formType.get();
    }
});

Template.card_news_admin.events({
    'click .reactive-table tbody tr': function(evt, tmpl) {
        $('#postId').val(this._id);
        $('#imageIds').val(this.images);
        evt.preventDefault();
        tmpl.selectedDoc.set(this._id);
        tmpl.selectedImages.set(this.images);
        tmpl.formType.set("update");
        // $('.submit-btn').text('Edit').removeClass('submit-btn').addClass('edit-btn');
    },
    'click .remove-btn': function(evt, tmpl) {
        evt.preventDefault();
        var postId = tmpl.selectedDoc.get();
        var imageIds = tmpl.selectedImages.get();
        Meteor.call('CardNews.remove', postId);
        Meteor.call('Images.remove', imageIds);
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImages.set("");
        tmpl.formType.set("insert");
    },
    'click .reset-btn': function(evt, tmpl) {
        evt.preventDefault();
        document.getElementById('Form').reset();
        tmpl.selectedDoc.set("");
        tmpl.selectedImages.set("");
        tmpl.formType.set("insert");
    }
});
