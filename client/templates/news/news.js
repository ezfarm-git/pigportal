Template.news.helpers({
    postsList: function() {
        if(FlowRouter.getParam('category')) {
            var categoryName = FlowRouter.getParam('category');
            return News.find({category: categoryName}, {sort: {date: -1}});
        } else {
            return News.find({}, {sort: {date: -1}});
        };
    },
    postsCategory: function() {
        if(FlowRouter.getParam('category')) {
            return FlowRouter.getParam('category');
        }
    }
});
