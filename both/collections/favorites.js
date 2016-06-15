Favorites = new Mongo.Collection('favorites');

Favorites.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: '이름'
    },
    url: {
        type: String,
        label: 'URL'
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
