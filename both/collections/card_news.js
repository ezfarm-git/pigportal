CardNews = new Mongo.Collection('card_news');

// ImageSchema = new SimpleSchema({
//     fileId: {
//         type: String,
//         autoform: {
//             afFieldInput: {
//                 type: 'cfs-file',
//                 collection: 'images'
//             }
//         }
//     }
// });

CardNews.attachSchema(new SimpleSchema({
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
    summary: {
        type: String,
        label: '요약'
    },
    images: {
        type: [String],
        label: '이미지'
    },
    'images.$': {
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "Images",
                accept: 'image/*'
            }
        }
    },
    category: {
        type: String,
        label: '카테고리',
        allowedValues: ['a', 'b', 'c'],
        autoform: {
            options: [
                {label: "a", value: "a"},
                {label: "b", value: "b"},
                {label: "c", value: "c"},
            ]
        }
    }
}));
