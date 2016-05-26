Session.set('isCheckingOut', false);

Template.cart.helpers({
    cartitems: function() {
        return Cart.find();
    }
});

Template.cart.events({
    "click .checkOutBtn": function() {
        Session.set('isCheckingOut', true);
    },
    "click #delFromCart": function(evt, tmpl) {
        console.log(this._id);
        // Meteor.call('Cart.remove', this._id);
        deletefromcart(this._id);
    }
});

function deletefromcart(id) {
    Meteor.call('Cart.remove', id);
}
