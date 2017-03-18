import mediator
from datetime import timedelta, datetime

# count how many users volunteered N times
def count_n_arrivals(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    count = 0
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None and len(attended) >= n:
                count += 1
        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return count


# count how many volunteers were inactive for at least N weeks
def count_inactive_x_weeks(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    count = 0
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None and len(attended) >= n:
                last_attended = get_last_attended(attended)
        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return count


# helpers
def get_last_attended(attended):
    return max(d for d in attended.values())