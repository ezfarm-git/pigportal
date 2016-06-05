Infographic = new Mongo.Collection('infographic');

Infographic.attachSchema(new SimpleSchema({
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
    image: {
        type: String,
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
        label: 'Category',
        allowedValues: ['인포1', '인포2', '인포3'],
        autoform: {
            options: [
                {label: "인포1", value: "인포1"},
                {label: "인포2", value: "인포2"},
                {label: "인포3", value: "인포3"},
            ]
        }
    }
}));
