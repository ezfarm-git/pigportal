Template.news.helpers({
    newsList: function() {
        if(FlowRouter.getParam('newsCategory')) {
            var categoryName = FlowRouter.getParam('newsCategory');
            return News.find({category: categoryName}, {sort: {date: -1}});
        } else {
            return News.find({}, {sort: {date: -1}});
        };
    }
});
