var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin'
    // triggersEnter: [function(context, redirect) {
    //     console.log('running group triggers');
    // }]
});

FlowRouter.route(['/', '/home'], {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
        this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
    },
    action: function() {
        console.log("Running Action to render templates into layouts");
        BlazeLayout.render('layout', {sidebar_left:'sidebar', main:'home', sidebar_right:''});
    }
});

FlowRouter.route('/news', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'news', sidebar_right:''});
    }
});

adminRoutes.route('/news', {
    subscriptions: function() {
        this.register('newsList', Meteor.subscribe('newsList'));
    },
    action: function() {
        BlazeLayout.render('layout_admin', {main:'news_admin'});
    }
});


FlowRouter.route('/admin', {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
    },
    action: function() {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
            BlazeLayout.render('layout', {sidebar_left:'', main:'admin', sidebar_right:''});
        } else {
            BlazeLayout.render('layout', {sidebar_left:'', main:'unauthorized', sidebar_right:''});
        }
    }
});
FlowRouter.route('/register', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'register', sidebar_right:''});
    }
});
FlowRouter.route('/profile', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'profile', sidebar_right:''});
    }
});
FlowRouter.route('/signin', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'signin', sidebar_right:''});
    }
});
FlowRouter.route('/signout', {
    action: function() {
        Meteor.logout(function(err) {
            if(!err) {
                FlowRouter.go('/signin');
            }
        })
    }
});
FlowRouter.route('/checkout', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'checkout', sidebar_right:''});
    }
});
FlowRouter.route('/category/:categoryName', {
    subscriptions: function(params) {
        this.register('catlist', Meteor.subscribe("category"));
        this.register('catproducts',Meteor.subscribe('products'));
        this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
    },
    triggersEnter: function(params) {
        console.log("ENTER", params);
    },
    triggersExit: function(params) {
        console.log("EXIT", params);
    },
    action: function() {
        console.log("Running Action to render templates into layouts")
        BlazeLayout.render('layout', {sidebar_left:'sidebar', main:'category', sidebar_right:''});
    }
});
