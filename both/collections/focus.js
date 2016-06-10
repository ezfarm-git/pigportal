Focus = new Mongo.Collection('focus');

Focus.attachSchema(new SimpleSchema({
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
    content: {
        type: String,
        label: '본문',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor'
            }
        }
    },
    image: {
        type: String,
        label: '이미지',
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
        allowedValues: ['가', '나', '다'],
        autoform: {
            options: [
                {label: "가", value: "가"},
                {label: "나", value: "나"},
                {label: "다", value: "다"},
            ]
        }
    }
}));
