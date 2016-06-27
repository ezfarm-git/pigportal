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
        allowedValues: ['글로벌', '리뷰', '자료'],
        autoform: {
            options: [
                {label: "글로벌", value: "글로벌"},
                {label: "리뷰", value: "리뷰"},
                {label: "자료", value: "자료"}
            ]
        }
    }
}));
