Template.registerHelper('prettyDate', function(date) {
    return moment(date).format('YYYY-MM-DD');
});
