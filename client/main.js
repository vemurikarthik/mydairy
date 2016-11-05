// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
Template.registrationForm.events({
	'submit #registrationForm': function() {
		event.preventDefault();
		var email = $("#registrationForm #email").val();
		var password = $("#registrationForm #password").val();
		var confirmPassword = $("#registrationForm #confirmpassword").val();
		var userData = {};
		userData.email = email.toLowerCase();
		userData.password = password;
		if(!email || !password || !confirmPassword || (password != confirmPassword)) {
			console.log('Please fill all the fields properly');
			// $("#registrationForm #password").css('border-color','red');
			// $("#registrationForm #confirmpassword").css('border-color','red');
		} else {
			Meteor.call('createNewUser',userData,function(err,data) {
				if(data) {
					console.log('error while creating user');
				} else {
					console.log('new user succesfully created')
				}
			})
		}
	}
});

Template.loginForm.events({
	'submit #loginForm': function() {
		event.preventDefault();
		var email = $("#loginForm #email").val();
		var password = $("#loginForm #password").val();
		var userData = {};
		userData.email = email;
		userData.password = password;
		Meteor.loginWithPassword(userData.email, userData.password);
	}
});