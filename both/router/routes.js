// Route Configure
Router.configure({
  trackPageView: true
});


// Test
Router.route('/test', function() {
    this.render('test');
});

Router.route('/test2', function () {
  this.render('test2');
});

// Main

Router.route('/', function () {
  this.layout('layout_main');
  this.render('main', {
    to: 'main'
  });
  this.wait(Meteor.subscribe('latestFocus'));
  // this.wait(Meteor.subscribe('mainFocus'));
  this.wait(Meteor.subscribe('mainNews'));
  // this.wait(Meteor.subscribe('mainCorps'));
  this.wait(Meteor.subscribe('mainCase'));
  // this.wait(Meteor.subscribe('mainCardNews'));
  // this.wait(Meteor.subscribe('mainInfographic'));
  this.wait(Meteor.subscribe('recentEvents'));
  this.wait(Meteor.subscribe('images'));
}, {
  name: 'main'
});

// Data - Product

Router.route('/data/product', {
  layoutTemplate: 'layout_app',
  template: 'product',
  yieldRegions: {
    'data_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_product'
});

// Data - Market

Router.route('/data/market', {
  layoutTemplate: 'layout_app',
  template: 'market',
  yieldRegions: {
    'data_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_market'
});

// Data - Stats - Pig - Pops

Router.route('/data/stats/pig/pops', {
  layoutTemplate: 'layout_app',
  template: 'stats_pig_pops',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_pig_pops'
});

// Data - Stats - Pig - Age

Router.route('/data/stats/pig/age', {
  layoutTemplate: 'layout_app',
  template: 'stats_pig_age',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_pig_age'
});

// Data - Stats - Pig - Grade

Router.route('/data/stats/pig/grade', {
  layoutTemplate: 'layout_app',
  template: 'stats_pig_grade',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_pig_grade'
});

// Data - Stats - Cow - Pops

Router.route('/data/stats/cow/pops', {
  layoutTemplate: 'layout_app',
  template: 'stats_cow_pops',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_cow_pops'
});

// Data - Stats - Cow - Age

Router.route('/data/stats/cow/age', {
  layoutTemplate: 'layout_app',
  template: 'stats_cow_age',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_cow_age'
});

// Data - Stats - Cow - Grade

Router.route('/data/stats/cow/grade', {
  layoutTemplate: 'layout_app',
  template: 'stats_cow_grade',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_cow_grade'
});

// Data - Stats - Chicken - Pops

Router.route('/data/stats/chicken/pops', {
  layoutTemplate: 'layout_app',
  template: 'stats_chicken_pops',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_chicken_pops'
});

// Data - Stats - Chicken - Age

Router.route('/data/stats/chicken/age', {
  layoutTemplate: 'layout_app',
  template: 'stats_chicken_age',
  yieldRegions: {
    'stats_category': {
      to: 'sidebar_left'
    }
  }
}, {
  name: 'data_stats_chicken_age'
});

// Data - Disease

Router.route('/data/disease', {
  layoutTemplate: 'layout_full_width',
  template: 'disease',
  name: 'data_disease'
});

// Data - Bigdata

Router.route('/bigdata/annually', {
  layoutTemplate: 'layout_full_width',
  template: 'bigdata_annually',
  name: 'bigdata_annually'
});
Router.route('/bigdata/monthly', {
  layoutTemplate: 'layout_full_width',
  template: 'bigdata_monthly',
  name: 'bigdata_monthly'
});
Router.route('/bigdata/scatter', {
  layoutTemplate: 'layout_full_width',
  template: 'bigdata_scatter',
  name: 'bigdata_scatter'
});
Router.route('/bigdata/data', {
  layoutTemplate: 'layout_full_width',
  template: 'bigdata',
  name: 'bigdata_data'
});


// News

Router.route('/news/:category/:page', function () {
  this.layout('layout_app');
  this.render('news_category', {
    to: 'sidebar_left'
  });
  this.render('news', {
    to: 'main',
    data: {
      categoryName: this.params.category
    }
  });
}, {
  name: 'news'
});

// Card News

// Router.route('/cardnews/:page', function () {
//   this.layout('layout_app');
//   this.render('banner', {
//     to: 'sidebar_left'
//   });
//   this.render('card_news', {
//     to: 'main'
//   });
// }, {
//   name: 'cardnews'
// });

// Corps

// Router.route('/corps/:page', function () {
//   this.layout('layout_app');
//   this.render('banner', {
//     to: 'sidebar_left'
//   });
//   this.render('corps', {
//     to: 'main'
//   });
// }, {
//   name: 'corps'
// });
//
// Router.route('/corps_post/:postId', function () {
//   this.layout('layout_app');
//   this.render('banner', {
//     to: 'sidebar_left'
//   });
//   this.render('corps_post', {
//     to: 'main',
//     data: {
//       postId: this.params.postId
//     }
//   });
//   this.wait(Meteor.subscribe('corpsPost', this.params.postId));
// }, {
//   name: 'corps_post'
// });

// Focus

// Router.route('/focus/:category/:page', function () {
//   this.layout('layout_app');
//   this.render('focus_category', {
//     to: 'sidebar_left'
//   });
//   this.render('focus', {
//     to: 'main',
//     data: {
//       categoryName: this.params.category
//     }
//   });
// }, {
//   name: 'focus'
// });
//
// Router.route('/focus_post/:postId', function () {
//   this.layout('layout_app');
//   this.render('focus_category', {
//     to: 'sidebar_left'
//   });
//   this.render('focus_post', {
//     to: 'main',
//     data: {
//       postId: this.params.postId
//     }
//   });
//   this.wait(Meteor.subscribe('focusPost', this.params.postId));
//   this.wait(Meteor.subscribe('files'));
// }, {
//   name: 'focus_post'
// });

// Favorites

Router.route('/favorites', function () {
  this.layout('layout_app');
  this.render('favorites_category', {
    to: 'sidebar_left'
  });
  this.render('favorites_summary', {
    to: 'main',
    data: {
      categoryName: this.params.category
    }
  });
  this.wait(Meteor.subscribe('favoritesSummary'));
}, {
  name: 'favorites'
});

Router.route('/favorites/:category', function () {
  this.layout('layout_app');
  this.render('favorites_category', {
    to: 'sidebar_left'
  });
  this.render('favorites', {
    to: 'main',
    data: {
      categoryName: this.params.category
    }
  });
  this.wait(Meteor.subscribe('favoritesList', this.params.category));
  this.wait(Meteor.subscribe('images'));
}, {
  name: 'favorites_category'
});

// Infographic

// Router.route('/infographic/:page', function () {
//   this.layout('layout_app');
//   this.render('banner', {
//     to: 'sidebar_left'
//   });
//   this.render('infographic', {
//     to: 'main',
//     data: {
//       categoryName: this.params.category
//     }
//   });
//   this.wait(Meteor.subscribe('images'));
// }, {
//   name: 'infographic'
// });

// Events

Router.route('/events', function () {
  this.layout('layout_app');
  this.render('banner', {
    to: 'sidebar_left'
  });
  this.render('events', {
    to: 'main'
  });
  this.wait(Meteor.subscribe('events'));
  this.wait(Meteor.subscribe('recentEvents'));
}, {
  name: 'events'
});

// Pigplan Inroduction

Router.route('/pigplan/intro', function () {
  this.layout('layout_app');
  this.render('pigplan_category', {
    to: 'sidebar_left'
  });
  this.render('pigplan_intro', {
    to: 'main'
  });
}, {
  name: 'pigplan_intro'
});

// Pigplan Feature

Router.route('/pigplan/feature', function () {
  this.layout('layout_app');
  this.render('pigplan_category', {
    to: 'sidebar_left'
  });
  this.render('pigplan_feature', {
    to: 'main'
  });
}, {
  name: 'pigplan_feature'
});

// Pigplan Use Case

Router.route('/pigplan/case/:page', function () {
  this.layout('layout_app');
  this.render('pigplan_category', {
    to: 'sidebar_left'
  });
  this.render('case', {
    to: 'main'
  });
}, {
  name: 'pigplan_case'
});

Router.route('/case_post/:postId', function () {
  this.layout('layout_app');
  this.render('pigplan_category', {
    to: 'sidebar_left'
  });
  this.render('case_post', {
    to: 'main',
    data: {
      postId: this.params.postId
    }
  });
  this.wait(Meteor.subscribe('casePost', this.params.postId));
  this.wait(Meteor.subscribe('images'));
}, {
  name: 'pigplan_case_post'
});
