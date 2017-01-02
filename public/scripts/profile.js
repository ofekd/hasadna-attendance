const database = firebase.database();
const bcrypt = dcodeIO.bcrypt;
const macRegex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
const zeroRegex = /^0+$/;

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
                document.getElementById('macAddress').placeholder = "קיים MAC במערכת תחת המשתמש שלך, בכדי למחוק הזנ/י \"0\" ולחצ/י על עדכון";
                
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
    var hashedMac = null;

    if (zeroRegex.test(macAddress)) {
        values['macAddress'] = "";
    } else if (macAddress) {
        if (!macRegex.test(macAddress)) {
            document.getElementById('feedback').textContent = "כתובת ה MAC שהזנת לא תקנית";
            valid = false;
        } else {
            hashedMac = bcrypt.hashSync(macAddress, bcrypt.genSaltSync(10));
            values['macAddress'] = hashedMac;
        }
    } else {
        delete values['macAddress'];
    }

    if (!valid) return false;

    var profPromise = database.ref('/users/' + userEmailKey + '/profile').update(values);

    if (hashedMac) {
        var dateJSONString = new Date().toJSON();

        profPromise
        .then(function() {
            return database.ref('/macs/' + userEmailKey)
                           .update({"mac" : hashedMac, "createdAt" : dateJSONString});
        });
    } else if (zeroRegex.test(macAddress)) {
        profPromise
        .then(function() {
            return database.ref('/macs/' + userEmailKey).remove();
        });
    }

    if (window.location.href.indexOf('?attend') > -1) {
        window.location.href = '/';
    } else {
        var macAdressDOM = document.getElementById('macAddress');

        document.getElementById('feedback').textContent = 'עודכן בהצלחה';
        
        if (hashedMac) {
            macAdressDOM.placeholder = "קיים MAC במערכת תחת המשתמש שלך, בכדי למחוק הזנ/י \"0\" ולחצ/י על עדכון"
            
        } else if (macAddress) {
            macAdressDOM.placeholder = "כתובת MAC";
        }

        macAdressDOM.value = "";
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
