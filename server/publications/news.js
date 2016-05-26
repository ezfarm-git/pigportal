Meteor.publish("newsList", function() {
    return News.find();
});

// Meteor.publish("categoryNews", function(categoryname) {
//     var categoryId = NewsCategory.findOne({name: categoryname})._id;
//     return News.find({category: categoryId});
// });
