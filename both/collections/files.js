var fileStore = new FS.Store.GridFS("files");

Files = new FS.Collection("Files", {
    stores: [fileStore]
});
