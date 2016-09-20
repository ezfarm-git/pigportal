// Template.main.onRendered(function() {
//   $('.fancybox').fancybox({
//       closeBtn: false,
//       maxHeight: '600',
//       helpers: {
//           title: {type: 'inside'}
//       }
//   });
// })

Template.main.helpers({
    latestFocus: function() {
        return Focus.find({}, {sort: {date: -1}, limit: 1});
    },
    // mainFocus: function() {
    //     return Focus.find({}, {skip: 1, limit: 10}, {sort: {date: -1, title: 1}});
    // },
    mainNews: function() {
        return News.find({}, {sort: {date: -1, title: 1}, limit: 20});
    },
    mainCorps: function() {
        return Corps.find({}, {sort: {date: -1, title: 1}, limit: 2});
    },
    mainCase: function() {
        return Case.find({}, {sort: {date: -1}, limit: 2});
    },
    // mainCardNews: function() {
    //     return CardNews.find({}, {sort: {date: -1}, limit: 1}).fetch()[0];
    // },
    // mainInfographic: function() {
    //     return Infographic.find({}, {sort: {date: -1}, limit: 1}).fetch()[0];
    // },
    mainEvents: function() {
        let recentEvents = Events.find({end: {$gte: moment().format('YYYY-MM-DD')}}, {sort: {start: 1}}).fetch();
        $.each(recentEvents, function(key, value) {
          if (value.start === value.end) {
            value.end = null;
          } else {
            value.end = moment(value.end).add(-1, 'day').format('YYYY-MM-DD');
          }
        });
        return recentEvents;
    }
});

// Template.main.events({
//     'click .fancybox': function(evt) {
//         evt.preventDefault();
//     }
// });
