const database = firebase.database();
const bcrypt = dcodeIO.bcrypt;
const macRegex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

var userEmailKey;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userEmailKey = user.email.split('.').join(',');
        database.ref('/users/' + userEmailKey + '/profile').once('value').then(function (snapshot) {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('profile-form').style.display = '';
            var profile = snapshot.val();

            if (profile['macAddress']) {
                document.getElementById('macAddress').placeholder = "קיים MAC במערכת, באפשרותך להזמין MAC חדש";
                
            }

            profile['macAddress'] = '';

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
    var valid = true;
    for (var i = 0; i < elements.length; i++) {
        values[elements[i].id] = elements[i].value;
    }

    /* Hashing the mac using bcrypt before sending to firebase  */
    var macAddress = values['macAddress'];

    if (macAddress) {
        if (!macRegex.test(macAddress)) {
            alert("כתובת ה MAC שהזנת לא תקנית");
            valid = false;
        } else {
            var hashedMac = bcrypt.hashSync(macAddress, 10);
            /* remove the chars firebase doesn't allow as a key */
            values['macAddress'] = hashedMac.replaceAll("$","").replaceAll(".","").replaceAll("/","");
        }
    } else {
        delete values['macAddress'];
    }

    if (!valid) return false;

    var profPromise = database.ref('/users/' + userEmailKey + '/profile')
        .update(values);

    if (macAddress) {
        var d = new Date();
        var dateDateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
        var dateJSONString = d.toJSON();

        profPromise
        .then(function(res) {
            return database.ref('/macs/' + values['macAddress'] + '/info')
                           .update({"email" : userEmailKey, "lastUpdate" : dateJSONString});
        })
        .then(function(res) {
            return database.ref('/macs/' + values['macAddress'] + "/attendance")
                           .once("value");
        })
        .then(function(snap) {
            var attendance = snap.val();

            if (attendance) {
                var updateObject = {};

                for (var key in attendance) {
                    attendance['/fakeAttendance/' + key + '/' + userEmailKey] = attendance[key];
                    attendance['/users/' + userEmailKey + '/attended/' + key] = attendance[key];
                    delete attendance[key];
                }

                Object.assign(updateObject, attendance);

                database.ref().update(updateObject);
            }
        });
    }

    if (window.location.href.indexOf('?attend') > -1) {
        window.location.href = '/';
    } else {
        document.getElementById('feedback').textContent = 'עודכן בהצלחה';
        if (macAddress) {
            var macAdressDOM = document.getElementById('macAddress');
            macAdressDOM.placeholder = "קיים MAC במערכת, באפשרותך להזמין MAC חדש"
            macAdressDOM.value = "";
        }
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
