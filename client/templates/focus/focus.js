Template.focus.helpers({
    postsList: function() {
        if (this.categoryName) {
            return Focus.find({category: this.categoryName}, {sort: {date: -1}});
        } else {
            return Focus.find({}, {sort: {date: -1}});
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
