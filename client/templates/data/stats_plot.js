Template.stats_plot.onCreated( function() {
  var data = this.data;
  console.log( "onCreated: ", data );
});

Template.stats_plot.onRendered( function() {
  var data = this.data;
  console.log( "onRendered: ", data );
});

Template.stats_plot.helpers({
  exclamation: function() {
    var data = Template.instance().data;
    return "That's a lot of " + data.contentType + "!";
  }
});

Template.stats_plot.events({
  'click .list-group-item': function( event, template ) {
    console.log( "name: ", this.name );
    console.log( "creator: ", this.creator );
  }
});
