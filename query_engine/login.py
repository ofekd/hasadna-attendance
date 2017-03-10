import pyrebase

config = {
  "apiKey": "AIzaSyDfDlnbBYJjijCLdoGg7WL0b3F4fb9bd_s",
  "authDomain": "hasadna-attendance.firebaseapp.com",
  "databaseURL": "https://hasadna-attendance.firebaseio.com",
  "storageBucket": "hasadna-attendance.appspot.com",
  "serviceAccount": "hasadna-attendance-firebase-adminsdk-efpir-16c903f0ad.json"
} 

firebase = pyrebase.initialize_app(config)

# Get a reference to the auth service
auth = firebase.auth()

print("---Authentication---")
print("Enter your email address: ")
email = input()
print("Enter your password: ")
password = input()

try:
  user = auth.sign_in_with_email_and_password(email, password)
except Exception as e:
  print("Login failed, error: {0}".format(e))
  raise

# at this point database can be used.