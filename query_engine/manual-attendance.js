<!DOCTYPE html>
<!-- this is a javascript connecting to firebase server but there are some complitions needed -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<head>
    <meta charset="utf-8" />
    <title>manual-attendance</title>
    <style>
        .h1{
            color:dimgray;
            background-color:lightgray
        }
        .h2{
            color:brown;
            background-color:lightgray;
        }
        .select{
            color:red;
            background-color:lightgray;
        }
        #lastNameBtn{
            background-color:lightgray;
            text-size-adjust:120%;
        }
        #updateBtn{
            background-color:lightgray;
            text-size-adjust:120%;
        }
        .option{
            background-color:lightgray;
            color:darkslategrey;
        }
    </style>
    <script src="https://www.gstatic.com/firebasejs/3.7.1/firebase.js"></script>
    <script>
  
        void function page_load() {
            var config = {
                apiKey: "<AIzaSyDfDlnbBYJjijCLdoGg7WL0b3F4fb9bd_s>",
                authDomain: "<hasadna-attendance>.firebaseapp.com",
                storageBucket: "<hasadna-attendance>.appspot.com",
                databaseURL: "https://hasadna-attendance.firebaseio.com",
            };
            firebase.initializeApp(config);
           var database = firebase.database();
        }
        function getFName() {
            var fName = document.getElementById("firstName").value;
            return fName;
        }

        function getLastNames() {
            var lastNamesArray = [15];
            var j=0;
            firebase.database().ref("/users").on("value", function(usersSnapshot) {
                usersSnapshot.forEach(function(user) {
                    var userKey = user.key;
                    var userValue = user.val();
                    // GUY L, here you can write the logic you need. you should have a list of users inside here (usersSnapshot) 
                    // and I added looping on these users so you can add your code HERE
                    lastNameArray[j]=user.val().lastName;
                    j++;
                });
            });           

            for (var i=0;i < j; i++){
                var x = document.getElementById("Select1");
                var option = document.createElement("option");
                option.text = lastNamesArray[i];
                x.add(option);
            }
        }
    </script>
</head>
<body class="container-fluid">
    <div class="container-fluid"> <h1 class="h1">This is a manual attendace entry interface</h1></div><br />
    <div class="container-fluid"><h2 class="h2">please click the "lastname" button first and then and olny then the "update" button</h2></div><br />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4"><input id="firstName" type="text" /></div>
            <div class="col-md-5"><select id="Select1"></select></div>
        </div>
        <div class="row">
            <div class="col-md-4"><input id="lastNameBtn" type="button" value="lastname" /></div>
            <div class="col-md-4"><input id="updateBtn" type="button" value="lastname" /></div>
        </div>
        </div>

</body>
</html>
