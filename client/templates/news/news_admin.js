Template.news_admin.helpers({
    newsList: function() {
        return News.find();
    }
});

Template.news_admin.events({
    'click .doc-edit': function(evt,tmpl) {
        $('#newsId').val(this._id);
        $('#date').val(this.date);
        $('#title').val(this.title);
        $('#url').val(this.url);
        $('#category').val(this.category);
        $('.addNews').text('Update News').removeClass('addNews').addClass('updateNews');
    },
    'click .updateNews': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#newsId').value;
        var date = tmpl.find('#date').value;
        var title = tmpl.find('#title').value;
        var url = tmpl.find('#url').value;
        var category = tmpl.find('#category').value;
        Meteor.call('News.update', id, date, title, url, category);
    },
    'click .removeNews': function(evt, tmpl) {
        evt.preventDefault();
        var id = tmpl.find('#newsId').value;
        Meteor.call('News.remove', id);
    },
    'click .return': function(evt, tmpl) {
        $('.updateNews').text('Add News').removeClass('updateNews').addClass('addNews');
        document.getElementById('NewsForm').reset();
    }
});
