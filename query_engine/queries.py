import mediator
from datetime import timedelta, datetime


# count how many users volunteered N times
def count_and_print_n_arrivals(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    users_list = []
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None and len(attended) >= n:
                user_profile = user.val().get('profile')
                users_list.append('{0} {1}.'.format(user_profile.get('firstName'), user_profile.get('lastName')))
        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return users_list


# count how many volunteers were inactive for at least N weeks
def count_inactive_x_weeks(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    users_list = []
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
                    user_profile = user.val().get('profile')
                    users_list.append('{0} {1}.'.format(user_profile.get('firstName'), user_profile.get('lastName')))

        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return users_list


# count how many volunteers came at least N weeks and never returned
def came_x_times_and_never_returned(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    users_list = []
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
                    user_profile = user.val().get('profile')
                    users_list.append('{0} {1}.'.format(user_profile.get('firstName'), user_profile.get('lastName')))

        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return users_list


def average_of_arrivals_in_n_weeks(n):
    n = int(n)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    count = 0
    users_list = []
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None:
                user_profile = user.val().get('profile')
                user_profile_name = ('{0} {1}.'.format(user_profile.get('firstName'), user_profile.get('lastName')))
                user_tup = (user_profile_name, count_attendances_in_last_n_weeks(attended, n) / n)
                users_list.append(tuple(user_tup))
        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return users_list


# helpers
def count_attendances_in_last_n_weeks(attended, n):
    count = 0
    last_date = datetime.now() - timedelta(weeks=n)
    for d in attended.values():
        converted_date = datetime.strptime(d, "%Y-%m-%dT%H:%M:%S.%fZ")
        if converted_date > last_date:
            count += 1

    return count


def get_last_attended(attended):
    return max(d for d in attended.values())