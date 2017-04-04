import pyrebase

from colors import ColorEngine


class Mediator(object):
    connection = None
    user=None

    def get_connection(self):
        return self.connection

    def get_token(self):
        return self.user['idToken']

    def login_to_firebase(self):
        config = {
            "apiKey": "AIzaSyDKNDAFLkSqwzr1BTjQq6ZZV8Xqb-WH4lA",
            "authDomain": "hasadna-attendance.firebaseapp.com",
            "databaseURL": "https://hasadna-attendance.firebaseio.com",
            "storageBucket": "hasadna-attendance.appspot.com",
            "serviceAccount": "c:/hasadna-attendance-firebase-adminsdk-efpir-b8a5ce26b1.json"
        }

        firebase = pyrebase.initialize_app(config)

        # Get a reference to the auth service
        auth = firebase.auth()

        ColorEngine.print("--- Authentication Process ---", ColorEngine.BLUE)
        print("Enter your email address: ")
        email = input()
        print("Enter your password: ")
        password = input()


        try:
            self.user = auth.sign_in_with_email_and_password(email, password)
            self.connection = firebase.database()
        except Exception as e:
            pass
            # trace error - print("Login failed, error: {0}".format(e))

        # at this point database can be used.

        return self.connection

connection = Mediator()