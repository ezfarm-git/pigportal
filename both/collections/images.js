var imageStore = new FS.Store.FileSystem("images", {
    // path: process.env.PWD + "/public/images"
});

// var cardNewsStore = new FS.Store.FileSystem("card_news_images", {});

Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

// cardNewsImages = new FS.Collection("cardNewsImages", {
//     stores: [cardNewsStore],
//     filter: {
//         allow: {
//             contentTypes: ['image/*']
//         }
//     }
// });
