var database = firebase.database();

var userEmailKey;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userEmailKey = user.email.split('.').join(',');
        database.ref('/users/' + userEmailKey + '/profile').once('value').then(function (snapshot) {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('profile-form').style.display = '';
            var profile = snapshot.val();
            var elements = document.getElementById('profile-data').elements;
            for (var i = 0; i < elements.length && profile; i++) {
                elements[i].value = profile[elements[i].id];
            }
        });
    } else {
        window.location.href = '/auth.html';
    }
});

function updateProfile (event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    var values = {}, elements = document.getElementById('profile-data').elements;
    for (var i = 0; i < elements.length; i++) {
        values[elements[i].id] = elements[i].value;
    }
    database.ref('/users/' + userEmailKey + '/profile').set(values);
    if (window.location.href.indexOf('?attend') > -1) {
        window.location.href = '/';
    } else {
        document.getElementById('feedback').textContent = 'עודכן בהצלחה';
    }
    return false;
}

var form = document.getElementById('profile-form');
if (form.attachEvent) {
    form.attachEvent('submit', updateProfile);
} else {
    form.addEventListener('submit', updateProfile);
}


//Does the link refresh the pages?
function signOut () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}
