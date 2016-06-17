Template.registerHelper('prettyDate', function(date) {
    return moment(date).format('YYYY-MM-DD');
});

Template.registerHelper("galleryHeight", function(array, height) {
    var len = array.length;
    var h = height/len;
    return String(h) + "px";
});
