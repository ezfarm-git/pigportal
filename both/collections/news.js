News = new Mongo.Collection('news');

News.attachSchema(new SimpleSchema({
    date: {
        type: Date,
        label: '일자',
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    },
    title: {
        type: String,
        label: '제목'
    },
    url: {
        type: String,
        label: 'URL'
    },
    category: {
        type: String,
        label: '카테고리',
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
    }
});
