Meteor.subscribe('userData');
Meteor.subscribe('channels');

// Attach this re-subscription code to template so it is not recomputed before and after template instance is actually created.
// Tracker.autorun(function() {
//     console.log('Requesting subscription to messages of #' + Session.get('currentChannel'));
//     Meteor.subscribe('messages', Session.get('currentChannel'));
// });


// Executed when the template is created (page refresh, DOM manipulations, etc) but before template logic is evaluated
Template.messages.onCreated(function() {

    console.log('Template being created');

    // this is the 'template instance' which represents an 'object' of the template.
    // Use it to persist properties that last even as template is reactively updated.
    var self = this;

    // .autorun is a 'reactive zone' which re-runs any time a reactive data source inside it changes.
    // templateInstance.autorun attaches this reactive zone to the template instance only and stops recomputing when template is destroyed
    // Here, every time the session (reactive source) changes, re-subscribe the template instance to the new channel
    // Note on why a global subscription won't work
    // 		A global subscription means the subscription is executed even before the Meteor.startup script which assigns the default currentChannel
    //		So we start off with a default subscription to no channel i.e. we are subscribed to the null channel from the get go
    //		When we do actually set the currentChannel, the subscription is still set to 'null' as it has no reason to re-subscribe.
    //		What we do is tell Meteor that when the template instance is created, subscribe with the right channel then. (Alternative commented at the global scope)
    //			But also call this subscription code again everytime, the reactive session is assigned.
    //		Note that Meteor.startup is called after the template.onCreated event so first subscription is always to null but gets updated quickly after .startup
    self.autorun(function() {
        console.log('Requesting subscription to messages of #' + Session.get('currentChannel'));
        self.subscribe('messages', Session.get('currentChannel'));
    });

});
