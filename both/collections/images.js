var imageStore = new FS.Store.FileSystem("images", {
    // path: process.env.PWD + "/public/images"
});

Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});
