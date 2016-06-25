// Template.registerHelper("currency", function(value) {
//     return '$' + '' + Number(value).toFixed(2);
// });

Template.registerHelper("truncate", function(inputtxt, strlen) {
    var shortened = inputtxt.substring(0, strlen) + '...';
    return new Spacebars.SafeString(shortened);
});
