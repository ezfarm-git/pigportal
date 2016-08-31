// for Admin
Meteor.publish("cardNewsListAdmin", function () {
  return CardNews.find();
});

// for Viewer
Meteor.publish("cardNewsList", function (skipCount) {
  var positiveIntegerCheck = Match.Where(function (x) {
    check(x, Match.Integer);
    return x >= 0;
  });
  check(skipCount, positiveIntegerCheck);

  Counts.publish(this, 'postsCount', CardNews.find(), {
    noReady: true
  });

  return CardNews.find({}, {
    limit: 10, // records to show per page
    skip: skipCount,
    sort: {
      date: -1
    }
  });
});
