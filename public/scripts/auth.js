function attemptAuth (event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
        window.location.href = '/index.html';
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

            if (error.code === 'auth/wrong-password') {
                document.getElementById('feedback').textContent = 'סיסמה לא נכונה';
            } else {
                document.getElementById('feedback').textContent = 'התרחשה שגיאה. עשינו לוג לקונסול.';
            }

            console.log(error.code, error.message);
        }
    });
    return false;
}


function passwordReset () {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        document.getElementById('feedback').textContent = 'נשלח מייל איפוס';
    }, function(error) {
        if (error.code === 'auth/user-not-found') {
            document.getElementById('feedback').textContent = 'לא נמצא משתמש עם כתובת מייל זו';
        } else {
            document.getElementById('feedback').textContent = 'התרחשה שגיאה. עשינו לוג לקונסול.';
        }
        console.log(error.code, error.message);
    });

}

var form = document.getElementById('attempt-form');
if (form.attachEvent) {
    form.attachEvent('submit', attemptAuth);
} else {
    form.addEventListener('submit', attemptAuth);
}
