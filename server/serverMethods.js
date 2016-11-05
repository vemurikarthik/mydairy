Meteor.methods({
	"createNewUser": function(userData) {
		Accounts.createUser(userData);
	}
});