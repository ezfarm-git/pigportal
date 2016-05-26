News = new Mongo.Collection('news');

News.attachSchema(new SimpleSchema({
    date: {
        type: Date,
        label: 'Date',
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    },
    title: {
        type: String,
        label: 'Title'
    },
    url: {
        type: String,
        label: 'URL'
    },
    category: {
        type: String,
        label: 'Category',
        allowedValues: ['A', 'B', 'C'],
        autoform: {
            options: [
                {label: "A", value: "A"},
                {label: "B", value: "B"},
                {label: "C", value: "C"},
            ]
        }
    }
}));

News.helpers({
    list: function() {
        return News.find({category: this.category});
    },
    category: function() {
        return NewsCategory.findOne(this.categoryId);
    }
});
