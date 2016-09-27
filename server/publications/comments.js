Meteor.publish("commentsListDisease", function () {
  return Comments.find({category: "disease"}, {sort: {date: -1}});
});
Meteor.publish("commentsListAnnually", function () {
  return Comments.find({category: "annually"}, {sort: {date: -1}});
});
Meteor.publish("commentsListMonthly", function () {
  return Comments.find({category: "monthly"}, {sort: {date: -1}});
});
Meteor.publish("commentsListScatter", function () {
  return Comments.find({category: "scatter"}, {sort: {date: -1}});
});
Meteor.publish("commentsListTable", function () {
  return Comments.find({category: "table"}, {sort: {date: -1}});
});
