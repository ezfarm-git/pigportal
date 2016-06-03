Meteor.methods({
    //update
    'Focus.update': function(id, date, title, summary, content, image, category) {
        return Focus.update(id, {$set: {date:date, title:title, summary:summary, content:content, image:image, category:category}});
    },
    // 'Focus.deleteImage': function(id, image) {
    //     return Focus.update(id, {$set: {image:image}});
    // },
    //delete
    'Focus.imageUpdate': function(id, image) {
        return Focus.update(id, {$set: {image:image}});
    },
    'Focus.remove': function(id) {
        return Focus.remove({_id: id});
    }
});
