Meteor.methods({
    addCategory: function(category) {
        var exist = Category.findOne({name: category.name});
        if(!exist) {
            return Category.insert(category);
        }
    }
});
