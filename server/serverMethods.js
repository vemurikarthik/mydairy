Meteor.methods({
	"createNewUser": function(userData) {
		return Accounts.createUser(userData);
	},
	"saveDiary": function(diaryObject) {		
		var secret = 'itsmydiary';
		var uniqueId = diaryObject.currentUser;
		Diary.update({currentDate:diaryObject.currentDate},diaryObject,{upsert:true});
	},
	"getDiary": function(diaryObject) {
		var diaryObject = Diary.findOne({$and:[{currentUser:diaryObject.currentUser},{currentDate:diaryObject.currentDate}]});
		if(diaryObject) {
			return diaryObject.diaryContent;
		} else {
			return "";
		}
	}
});