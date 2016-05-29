Meteor.methods({
    //update
    'Focus.update': function(id, date, title, summary, content, image, category) {
        return Focus.update(id, {$set: {date:date, title:title, summary:summary, content:content, image:image, category:category}});
    },
    //delete
    'Focus.remove': function(id) {
        return Focus.remove({_id: id});
    }
});
