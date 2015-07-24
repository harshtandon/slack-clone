Factory.define('messageFactory', Messages, {
    messageText: function() {
        return Fake.sentence();
    },
    timestamp: new Date(),
    channel: 'general'
});

// server.startup is called as soon as the server process is finished starting
Meteor.startup(function() {

    // Remove everything, allowed because it being done on the server
    Messages.remove({});
    Channels.remove({});

    Channels.insert({
        name: 'general'
    });
    Channels.insert({
        name: 'simpsons'
    });
    Channels.insert({
        name: 'archer'
    });


    // Insert some fake records via the factory
    _(1).times(function(n) {
        Factory.create('messageFactory');
    });

});
