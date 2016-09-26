Template.test.helpers({
  username: function() {
    return Meteor.user().username || Meteor.user().profile.name;
  },
  comments: function() {
    return Comments.find({category: "annually"}, {sort: {date: -1}});
  },
  tableSetting: function() {
      return {
          collection: Comments,
          rowsPerPage: 10,
          showFilter: false,
          showRowCount: false,
          showColumnToggles: false,
          multiColumnSort: false,
          showNavigationRowsPerPage: false,
          fields: [
              { key: 'createdAt', label: '일자', sortOrder: 0, sortDirection: 'descending', hidden: true },
              { key: 'author', label: '작성자' },
              { key: 'content', label: '코멘트' }
          ]
      };
  }
});
