Template.news.helpers({
    postsList: function() {
        if (this.categoryName) {
            return News.find({category: this.categoryName}, {sort: {date: -1}});
        } else {
            return News.find({}, {sort: {date: -1}});
        };
    },
    postsCategory: function() {
        if (this.categoryName) {
            return this.categoryName;
        } else {
            return "전체";
        }
    }
});
