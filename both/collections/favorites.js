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
        allowedValues: ['정부기관', '대학', '협회', '단체', '학회', '언론', '기업', '해외', '기타'],
        autoform: {
            options: [
                {label: "정부기관", value: "정부기관"},
                {label: "대학", value: "대학"},
                {label: "협회", value: "협회"},
                {label: "단체", value: "단체"},
                {label: "학회", value: "학회"},
                {label: "언론", value: "언론"},
                {label: "기업", value: "기업"},
                {label: "해외", value: "해외"},
                {label: "기타", value: "기타"}
            ]
        }
    }
}));
