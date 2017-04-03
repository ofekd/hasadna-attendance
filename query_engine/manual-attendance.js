<!DOCTYPE html>
<!-- this is a javascript connecting to firebase server but there are some complitions needed -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
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
    <script >
  
        void function page_load() {
            var config = {
                apiKey: "<AIzaSyDfDlnbBYJjijCLdoGg7WL0b3F4fb9bd_s>",
                authDomain: "<hasadna-attendance>.firebaseapp.com",
                databaseURL: "https://<hasadna-attendance>.firebaseio.com",
                storageBucket: "<hasadna-attendance>.appspot.com",
                //messagingSenderId: "<SENDER_ID>",
            };//ask guyziv
            firebase.initializeApp(config);
            firebase.database()
        }
        function getFName() {
            var fName = document.getElementById("firstName").value;
            return fName;
        }

        function getLastNames() {
            var lastNamesArray = [15];
            //database query here
            /*for(var j=0;j<15;j++){
                lastNameArray[j]=query.startat(j+1(or j idk if it acts like an array or not ) & EndAt(same));
                if(lastNameArray[j]==null){
                    var count = j;
                    break;
                }
             }
        */
            for (var i=0;i < count; i++){
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
