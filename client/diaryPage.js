Template.diaryPage.helpers({
	month: function() {
		return moment().format('MMMM');
	},
	dayAndDate: function() {
		return moment().format('dddd, d').toUpperCase();
	},
	year: function() {
		return moment().format('YYYY');
	}
});

Template.showUserInfo.helpers({
	getUserName: function() {
		return Meteor.user().username;
	}
});

Template.diaryPage.events({
	'change #selectDiaryDate': function() {
		var date = $('#selectDiaryDate').val();
		if(date != "") {
			sAlert.closeAll();
			sAlert.info("Thanks for selecting " + date);
		}
	}
})

Template.selectDate.rendered = function() {
	$('#selectDiaryDate').datepicker({format: 'dd/mm/yyyy',autoclose:true});
}