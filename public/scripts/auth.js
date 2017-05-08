TRANSLATED_ERROR_MESSAGES = {
    "auth/invalid-email": "אימייל לא תקין",
    "auth/wrong-password": "סיסמה לא נכונה", /* in case we ever need a password engine */
    "auth/too-many-requests": "נשלחו יותר מדי בקשות, המתן מספר שניות עד לבקשה הבאה",
    "auth/user-not-found" : "לא נמצא משתמש עם כתובת מייל זו"
}

/*function attemptAuth (event) {
    if (event.preventDefault) {
        event.preventDefault();
    }*/
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if(password===""){
          password="1234567";
       } 
firebase.auth().signInWithEmailAndPassword(email, password)
  
.then(function () {
        //window.location.href = '/index.html';
    }).catch(function (error) {
        if (error && error.code === 'auth/user-not-found') {
            if (password.length < 7) {
                document.getElementById('feedback').textContent = 'על הסיסמה לכלול לפחות 7 תווים';
                return false;
            }

            return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) { 
                window.location.href = '/profile.html?attend';
            }).catch(function (error) {
                console.log(error.code, error.message);
            });
        } else if (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode in TRANSLATED_ERROR_MESSAGES) {
                errorMessage = TRANSLATED_ERROR_MESSAGES[errorCode];
            }

            document.getElementById('feedback').textContent = errorMessage;

            console.log(error.code, error.message);
        }
    return false;
});

/*
function passwordReset () {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        document.getElementById('feedback').textContent = 'נשלח מייל איפוס';
    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode in TRANSLATED_ERROR_MESSAGES) {
            errorMessage = TRANSLATED_ERROR_MESSAGES[errorCode];
        }

        document.getElementById('feedback').textContent = errorMessage;

        console.log(error.code, error.message);
    });

}*//* 

var form = document.getElementById('attempt-form');
if (form.attachEvent) {
    form.attachEvent('submit', attemptAuth);
} else {
    form.addEventListener('submit', attemptAuth);
} */

