Template.comments_annually.onCreated(function () {
  this.selectedDoc = new ReactiveVar("");
  this.formType = new ReactiveVar("insert");
  this.askPass = new ReactiveVar(false);
});

Template.comments_annually.onDestroyed(function () {
  document.getElementById('Form').reset();
  this.selectedDoc.set(null);
  this.formType.set(null);
  this.askPass.set(null);
});

Template.comments_annually.helpers({
  comments: function () {
    return Comments.find({
      category: "annually"
    }, {
      sort: {
        date: -1
      }
    });
  },
  tableSetting: function () {
    return {
      collection: Comments,
      rowsPerPage: 10,
      showFilter: false,
      showRowCount: false,
      showColumnToggles: false,
      multiColumnSort: false,
      showNavigationRowsPerPage: false,
      fields: [{
        key: 'createdAt',
        label: '일자',
        fn: function (value, object, key) {
          const date = new Date(value);
          const prettyDate = date.toLocaleDateString();
          return prettyDate;
        },
        sortOrder: 0,
        sortDirection: 'descending',
        hidden: false
      }, {
        key: 'author',
        label: '작성자'
      }, {
        key: 'content',
        label: '코멘트'
      }]
    };
  },
  selectedDoc: function () {
    return Comments.findOne(Template.instance().selectedDoc.get());
  },
  formType: function () {
    return Template.instance().formType.get();
  },
  askPass: function() {
    return Template.instance().askPass.get();
  }
});

Template.comments_annually.events({
  'click .reactive-table tbody tr': function (evt, tmpl) {
    evt.preventDefault();
    tmpl.selectedDoc.set(this._id);
    tmpl.askPass.set(true);
  },
  'click #insert-reset': function (evt, tmpl) {
    evt.preventDefault();
    document.getElementById('author').value = '';
    document.getElementById('pass').value = '';
    document.getElementById('content').value = '';
  },
  'click #pass-submit': function (evt, tmpl) {
    evt.preventDefault();
    const test = document.getElementById('pass-test').value;
    const text = document.getElementById('input-pass').value;
    if (text === test) {
      document.getElementById('pass-not-match').innerHTML = '';
      tmpl.askPass.set(false);
      tmpl.formType.set("update");
    } else {
      document.getElementById('pass-not-match').innerHTML = '비밀번호가 일치하지 않습니다.';
    }
  },
  'click .cancel': function(evt, tmpl) {
    evt.preventDefault();
    tmpl.selectedDoc.set("");
    tmpl.formType.set("insert");
    tmpl.askPass.set(false);
    document.getElementById('Form').reset();
  },
  'click .remove-btn': function (evt, tmpl) {
    evt.preventDefault();
    var postId = tmpl.selectedDoc.get();
    Meteor.call('Comments.remove', postId);
    tmpl.selectedDoc.set("");
    tmpl.formType.set("insert");
    document.getElementById('Form').reset();
  }
});
