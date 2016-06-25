Template.case_post.helpers({
    post: function() {
        var postId = this.postId;
        return Case.find({_id: postId}).fetch()[0];
    }
});

Template.case_post.events({
    'click .nv-share': function() {
        window.open("//band.us/plugin/share?body=hello&route=www.bloter.net", "share_band", "width=410, height=540, resizable=no");
    },
    'click .kk-share': function() {
        window.open('//story.kakao.com/share?url=URL', '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=600,height=600'); return false;
    }
})
