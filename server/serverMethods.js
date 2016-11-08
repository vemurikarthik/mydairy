Meteor.methods({
	"createNewUser": function(userData) {
		return Accounts.createUser(userData);
	}
});