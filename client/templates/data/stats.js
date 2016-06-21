Template.stats.onRendered(function() {
    this.currentTab = new ReactiveVar("stats_A");
});

Template.stats.helpers({
    tab: function() {
        return Template.instance().currentTab.get();
    },
    tabData: function() {
        var tab = Template.instance().currentTab.get();
        var data = {
            "stats_A": [
                {
                    "name": "Seeking Wisdom: From Darwin to Munger", "creator": "Peter Bevelin"
                }
            ],
            "stats_B": [
                {
                    "name": "Ghostbusters", "creator": "Dan Aykroyd"
                }
            ],
            "stats_C": [
                {
                    "name": "Grand Theft Auto V", "creator": "Rockstar Games"
                }
            ]
        };
        return { contentType: tab, items: data[ tab ] };
    }
});

Template.stats.events({
    'click .nav-pills li': function(evt, tmpl) {
        var currentTab = $(evt.target).closest("li");
        currentTab.addClass("active");
        $(".nav-pills li").not(currentTab).removeClass("active");
        tmpl.currentTab.set(currentTab.data("template"));
    }
});
