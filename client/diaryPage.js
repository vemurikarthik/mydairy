Template.diaryPage.helpers({
	date: function() {
		return moment().format('MMMM Do YYYY , dddd');
	}
});

Template.showUserInfo.helpers({
	getUserName: function() {
		if(Meteor.user()) {
			return Meteor.user().username;
		}		
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