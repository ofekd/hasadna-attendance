 function Page_Load(){
   var config = {
                apiKey: "<AIzaSyDfDlnbBYJjijCLdoGg7WL0b3F4fb9bd_s>",
                authDomain: "<hasadna-attendance>.firebaseapp.com",
                storageBucket: "<hasadna-attendance>.appspot.com",
                databaseURL: "https://hasadna-\attendance.firebaseio.com",
            };
            firebase.initializeApp(config);
           var database = firebase.database();
        }
 }
 function getLastNames() {
         
            var lastNamesArray = [15];
            var j=0;
            var fName = document.getElementById("firstName").value;
            
            firebase.database().ref("/users").on("value", function(usersSnapshot) {
                usersSnapshot.forEach(function(user) {
                    if(user.firstName === fName)){
                        lastNamesArray[j]=user.lastName;
                        j++;
                       }
                });
            });     
            for (var i=0;i <= j; i++){
                var x = document.getElementById("Select1");
                var option = document.createElement("option");
                option.text = lastNamesArray[i];
                x.add(option);
            }
        }
function
		var lName = document.getElementById("Select1")
		var FName = document.getElementById("firstName")
        function(usersSnapshot) {
                usersSnapshot.forEach(function(user) {
                   if(user.firstName === FName && user.lastName === lName){
                   var email= user.email;
                   var password = user.password;
				   }
                  });
            });     
                 
        firebase.auth().signInWithEmailAndPassword(email, password)
   .then(function () {
        window.location.href = '/manual-attendance.js';
    }).catch(function (error) {   
            }
}
