Focus = new Mongo.Collection('focus');

Focus.attachSchema(new SimpleSchema({
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
    summary: {
        type: String,
        label: 'Summary'
    },
    content: {
        type: String,
        label: 'Content',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor'
            }
        }
    },
    image: {
        type: String,
        label: 'Image',
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'images',
                accept: 'image/*'
            }
        },
        optional: true
    },
    category: {
        type: String,
        label: 'Category',
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
