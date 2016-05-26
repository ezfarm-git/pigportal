Meteor.methods({
    //update
    'News.update': function(id, date, title, url, category) {
        return News.update(id, {$set: {date:date, title:title, url:url, category:category}});
    },
    //delete
    'News.remove': function(id) {
        return News.remove({_id: id});
    }
});
