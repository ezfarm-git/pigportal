Comments = new Mongo.Collection('comments');

Comments.attachSchema(new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  category: {
    type: String,
    allowedValues: ['disease', 'annually', 'monthly', 'scatter', 'table'],
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  author: {
    type: String,
    label: '작성자',
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  pass: {
    type: Number,
    regEx: /[0-9][0-9][0-9][0-9]/g,
    label: '비밀번호 (4자리 숫자)',
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  },
  content: {
    type: String,
    label: '코멘트',
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  }
}));
