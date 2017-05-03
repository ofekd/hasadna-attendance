 function Page_Load(){
	 //firebase init
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
                    if(user.val().get("firstName") === fName)){
			    //creating an array that containes all the options we want enterd to the select element
                        lastNamesArray[j]=user.val().get("lastName");
                        j++;
                       }
                });
            });     
            for (var i=0;i <= j; i++){
		    //jquery add a new opttion that containes a last name from the list
		$('#Select1').append($('<option>', {
    value: lastNamesArray[i],
    text: lastNamesArray[i]
}));
            }
        }
function update(){
		var LName = document.getElementById("Select1");
		var FName = document.getElementById("firstName");
	//running all the users and checking which one of them maches the name and last name
        firebase.database().ref("/users").on("value", function(usersSnapshot) {
                usersSnapshot.forEach(function(user) {
                   if(user.val().get("firstName") === FName && user.val().get("lastName") === LName){
                   var email= user.val().get("email");
                   var password = user.val().get("password");
				   }
                  });
            });     
          //this is actually a sign in function: the user manualy entered is actually getting signed in        
        firebase.auth().signInWithEmailAndPassword(email, password)
   .then(function () {
        window.location.href = '/manual-attendance.js';
    }).catch(function (error) {  
		console.log("error with sign in");
            }
}
