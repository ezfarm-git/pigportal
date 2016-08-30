// Focus

Meteor.publish("latestFocus", function() {
  return Focus.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish("mainFocus", function() {
  return Focus.find({}, {skip: 1, limit: 6}, {sort: {date: -1, title: 1}});
});


// News

Meteor.publish("mainNews", function() {
  return News.find({}, {sort: {date: -1, title: 1}, limit: 6});
});


// Corps

Meteor.publish("mainCorps", function() {
  return Corps.find({}, {sort: {date: -1, title: 1}, limit: 2});
});


// Case

Meteor.publish("mainCase", function() {
  return Case.find({}, {sort: {date: -1}, limit: 1});
});


// CardNews

Meteor.publish("mainCardNews", function() {
  return CardNews.find({}, {sort: {date: -1}, limit: 1});
});


// Infographic

Meteor.publish("mainInfographic", function() {
  return Infographic.find({}, {sort: {date: -1}, limit: 1});
});
