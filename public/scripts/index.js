TRANSLATED_ERROR_MESSAGES = {
    "PERMISSION_DENIED": "אין הרשאה",
}

var database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // . (dot) is an invalid character in Firebase keys
        var userEmailKey = user.email.split('.').join(',');
        
        return database.ref('/users/' + userEmailKey).once('value').then(function (snapshot) {
            
            var userSnap = snapshot.val();

            if (userSnap && !userSnap.uid) {
                return firebase.database().ref('/users/' + userEmailKey).update({
                    uid: user.uid
                });
            } else if (!userSnap) {
                return firebase.database().ref('/users/' + userEmailKey).set({
                    uid: user.uid,
                    profile: {}
                });
            }

            return userSnap;
        }).then(function (userSnap) {

            if (userSnap && userSnap.profile && userSnap.profile.macAddress) {
                document.getElementById('feedback').textContent = "הרשמתך מתבצעת באופן אוטומטי";
                var attendBTNContainer = document.createElement('div');
                attendBTNContainer.innerHTML = '<a href="#" onclick="attend()" id="manualAttend" class="whiteBtn">הייתי פה</a>';
                document.getElementsByClassName('splash')[0].appendChild(attendBTNContainer);
                return true;
            }

            var d = new Date();
            var dateDateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
            var dateJSONString = d.toJSON();
            var updateObject = {};
            updateObject['/users/' + userEmailKey + '/attended/' + dateDateString] = dateJSONString;
            updateObject['/attendance/' + dateDateString + '/' + userEmailKey] = dateJSONString;
            return database.ref().update(updateObject);
        }).then(function (isAuto) {
            if(!isAuto) document.getElementById('feedback').textContent = 'נרשמת בהצלחה!';
        }).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = 'התרחשה שגיאה. עשינו לוג לקונסול.';

            if (errorCode in TRANSLATED_ERROR_MESSAGES) {
                errorMessage = TRANSLATED_ERROR_MESSAGES[errorCode];
            }

            document.getElementById('feedback').textContent = errorMessage;

            console.log(error.code, error.message);
        });
    } else {
        window.location.href = '/auth.html';
    }
});



//Does the link refresh the pages?
function signOut () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}

// Attend the current user
function attend() {
    var user = firebase.auth().currentUser;
    if (user) {
        var userEmailKey = user.email.split('.').join(',');
        var d = new Date();
        var dateDateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
        var dateJSONString = d.toJSON();
        var updateObject = {};
        updateObject['/users/' + userEmailKey + '/attended/' + dateDateString] = dateJSONString;
        updateObject['/attendance/' + dateDateString + '/' + userEmailKey] = dateJSONString;
        database.ref().update(updateObject).then(function() {
            document.getElementById('feedback').textContent = "נרשמת בהצלחה!";
			database.ref('/users/' + userEmailKey).once('profile', function(snapshot){
				if(snapshot.val() == null){
					 document.getElementById('feedback').textContent = "חסר מידע אישי, אנא עדכן בדף הפרופיל";
				}
			});	
            document.getElementById('manualAttend').remove();
        }, function (error) {
            document.getElementById('feedback').textContent = "התרחשה שגיאה. עשינו לוג לקונסול.";
        });
    }
}
