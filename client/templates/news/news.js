Template.news.helpers({
    newsList: function() {
        if(FlowRouter.getParam('newsCategory')) {
            var categoryName = FlowRouter.getParam('newsCategory');
            return News.find({category: categoryName});
        } else {
            return News.find();
        };
    }
});
