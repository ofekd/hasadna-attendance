
var database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // . (dot) is an invalid character in Firebase keys
        var userEmailKey = user.email.split('.').join(',');
        var d = new Date();
        var dateDateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
        var dateJSONString = d.toJSON();
        var updateObject = {};
        updateObject['/users/' + userEmailKey + '/attended/' + dateDateString] = dateJSONString;
        updateObject['/attendance/' + dateDateString + '/' + userEmailKey] = dateJSONString;
        database.ref().update(updateObject);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('success').style.display = '';
    } else {
        window.location.href = '/auth.html';
    }
});


    
//Does the link refresh the pages?
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}