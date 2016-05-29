Template.focus.helpers({
    postsList: function() {
        if(FlowRouter.getParam('category')) {
            var categoryName = FlowRouter.getParam('category');
            return Focus.find({category: categoryName}, {sort: {date: -1}});
        } else {
            return Focus.find({}, {sort: {date: -1}});
        };
    },
    postsCategory: function() {
        if(FlowRouter.getParam('catgegory')) {
            return FlowRouter.getParam('category');
        }
    }
});
