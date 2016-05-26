FlowRouter.route(['/', '/home'], {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
        this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
    },
    action: function() {
        console.log("Running Action to render templates into layouts");
        BlazeLayout.render('layout', {sidebar:'sidebar', main:'home', cart:'cart'});
    }
});
FlowRouter.route('/admin', {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
    },
    action: function() {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
            BlazeLayout.render('layout', {sidebar:'', main:'admin', cart:''});
        } else {
            BlazeLayout.render('layout', {sidebar:'', main:'unauthorized', cart:''});
        }
    }
});
FlowRouter.route('/register', {
    action: function() {
        BlazeLayout.render('layout', {sidebar:'', main:'register', cart:''});
    }
});
FlowRouter.route('/profile', {
    action: function() {
        BlazeLayout.render('layout', {sidebar:'', main:'profile', cart:''});
    }
});
FlowRouter.route('/signin', {
    action: function() {
        BlazeLayout.render('layout', {sidebar:'', main:'signin', cart:''});
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
        BlazeLayout.render('layout', {sidebar:'', main:'checkout', cart:''});
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
        BlazeLayout.render('layout', {sidebar:'sidebar', main:'category', cart:'cart'});
    }
});
