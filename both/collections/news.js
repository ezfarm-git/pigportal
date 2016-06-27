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
        allowedValues: ['알림', '산업', '현장'],
        autoform: {
            options: [
                {label: "알림", value: "알림"},
                {label: "산업", value: "산업"},
                {label: "현장", value: "현장"}
            ]
        }
    }
}));
