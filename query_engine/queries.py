import mediator
import time
from datetime import timedelta, datetime

# count how many users volunteered N times
def count_n_arrivals(n, num_of_weeks = 520):
    n = int(n)
    connection = mediator.connection.get_connection()
    user_token = mediator.connection.get_token()
    users = connection.child("users").get(token = user_token)
    count = 0
    for user in users.each():
        try:
            attended = user.val().get("attended", token = user_token)
            if user.val().get("attended", token = user_token) is not None and len(attended) >= n:
                #count if attended in the past n weeks

                curr_time = time.localtime()
                for att in attended.each():
                    #time format in the database is: year-month-day:Houres:Minutes:Seconds:milisecZ
                    t = time.strptime(att.val(), "%Y-%m-%d:%H:%ML%S")
                    t_sec = time.mktime(t)
                    if ((time.mktime(curr_time) - t_sec) / (60*60*24*7)) <= num_of_weeks:
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
            if user.val().get("attended") is not None:
                last_attended = get_last_attended(attended)
                last_attended_parsed = datetime.strptime(last_attended, "%Y-%m-%dT%H:%M:%S.%fZ").date()
                today_date = datetime.now().date()
                today_days_delta = (today_date - timedelta(days=today_date.weekday()))
                last_attended_days_delta = (last_attended_parsed - timedelta(days=last_attended_parsed.weekday()))
                weeks_diff = (today_days_delta - last_attended_days_delta).days / 7
                if weeks_diff >= n:
                    count += 1

        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return count


# count how many volunteers came at least N weeks and never returned
def came_x_times_and_never_returned(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    count = 0
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None and len(attended) >= n:
                last_attended = get_last_attended(attended)
                last_attended_parsed = datetime.strptime(last_attended, "%Y-%m-%dT%H:%M:%S.%fZ").date()
                today_date = datetime.now().date()
                today_days_delta = (today_date - timedelta(days=today_date.weekday()))
                last_attended_days_delta = (last_attended_parsed - timedelta(days=last_attended_parsed.weekday()))
                weeks_diff = (today_days_delta - last_attended_days_delta).days / 7
                if weeks_diff >= 3:
                    count += 1

        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return count

# helpers
def get_last_attended(attended):
    return max(d for d in attended.values())