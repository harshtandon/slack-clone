
// publish is a consequence of removing the auto-publish package
Meteor.publish('messages', function(channel) {
	console.log('Subscribing to ... ' + channel);
	Meteor._sleepForMs(250);
    return Messages.find({
    	channel: channel
    });
});

Meteor.publish('userData', function() {
    return Meteor.users.find({}, {
        fields: {
            "username": 1,
            "services.facebook.name": 1
        }
    });
});

Meteor.publish('channels', function(){
	return Channels.find();
});

// allow/dendy rules are a consequence of removing insecure
// Messages.allow({
//     insert: function(userId, doc) {
//         return (userId === doc.userId);
//     }
// });


