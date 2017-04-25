<!DOCTYPE html>
<!-- this is a javascript connecting to firebase server but there are some complitions needed -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<head>
    <meta charset="utf-8" />
    <title>manual-attendance</title>
    <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
    <script> 
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
		    // adding an option to the select element
                var x = document.getElementById("Select1");
                var option = document.createElement("option");
                option.text = lastNamesArray[i];
                x.add(option);
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
</script>
    <style>
       .h1{
            color:dimgray;
            background-color:lightgray;
        }
        .h2{
            color:black;
            background-color:lightgray;
        }
        select{
            color:red;
            background-color:white;
        }
        #lastNameBtn{
            background-color:darkgray;
            text-size-adjust:120%;
        }
        #updateBtn{
            background-color:darkgray;
            text-size-adjust:120%;
        }
        option{
            background-color:darkgray;
            color:darkgray;
        }
        body{
            background-color:lightgray;
        }
    </style>
<body class="container-fluid">
    <div class="container-fluid"> <h1 class="h1">This is a manual attendace entry interface</h1></div><br />
    <div class="container-fluid"><h2 class="h2">please click the "lastname" button first and then and olny then the "update" button</h2></div><br />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4"><input id="firstName" type="text" /></div>
            <div class="col-md-5"><select id="Select1"></select></div>
        </div>
        <div class="row">
            <div class="col-md-4"><input id="lastNameBtn" type="button" value="lastname" onclick="getLastNames()"/></div>
            <div class="col-md-4"><input id="updateBtn" type="button" value="update" onclick="update()"/></div>
        </div>
        </div>

</body>
