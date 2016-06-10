Template.favorites.helpers({
    postsCategory: function() {
        if (this.categoryName !== "total") {
            return this.categoryName;
        } else {
            return "전체";
        }
    },
    postsList: function() {
        if (this.categoryName === "total") {
            return Favorites.find({}, {sort: {date: -1}});
        } else {
            return Favorites.find({category: this.categoryName}, {sort: {date: -1}});
        }
    }
});
