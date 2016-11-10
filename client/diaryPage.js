Template.diaryPage.helpers({
	date: function() {
		return Session.get('currentDate');
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
			Session.set('currentDate',moment(new Date(date)).format('MMMM Do YYYY , dddd'));
			var diaryObject = {};
			diaryObject.currentDate  = Session.get('currentDate');
			diaryObject.currentUser  = Meteor.userId();	
			Meteor.call('getDiary',diaryObject,function(err, data) {
				if(err) {
					sAlert.error("Diary fetch failed");
				} else {
					$('.diaryContent').val(data);
				}
			});
		}
	},
	'click .saveDiaryButton': function() {
		var diaryObject = {};
		diaryObject.diaryContent = $('.diaryContent').val();
		diaryObject.currentDate  = Session.get('currentDate');
		diaryObject.currentUser  = Meteor.userId();
		Meteor.call('saveDiary', diaryObject, function(err,data) {
			if(err) {
				sAlert.error("Diary update failed");
			} else {
				sAlert.closeAll();
				sAlert.info("Diary successfully updated");
			}
		})
	}
})

Template.diaryPage.rendered = function() {
	$('#selectDiaryDate').val(moment().format('MM/D/YYYY'));
	Session.set('currentDate',moment().format('MMMM Do YYYY , dddd'));
	var diaryObject = {};
	diaryObject.currentDate  = Session.get('currentDate');
	diaryObject.currentUser  = Meteor.userId();	
	Meteor.call('getDiary',diaryObject,function(err, data) {
		if(err) {
			sAlert.error("Diary fetch failed");
		} else {
			$('.diaryContent').val(data);
		}
	});
}


Template.selectDate.rendered = function() {
	$('#selectDiaryDate').datepicker({format: 'mm/dd/yyyy',autoclose:true});
}	