import mediator
import menu
from colors import ColorEngine

connection = mediator.connection.login_to_firebase()

if connection is None:
    ColorEngine.print("Authentication failed.", ColorEngine.RED)
else:
    ColorEngine.print("Authentication succeeded.", [ColorEngine.BOLD, ColorEngine.GREEN])
    menu.show_menu()


