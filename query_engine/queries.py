import mediator


# count how many users volunteered N times
def count_n_arrivals(N):
    N = int(N)
    connection = mediator.connection.get_connection()
    users = connection.child("users").get()
    count = 0
    for user in users.each():
        try:
            attended = user.val().get("attended")
            if user.val().get("attended") is not None and len(attended) >= N:
                count += 1
        except Exception as e:
            # trace error - print("Login failed, error: {0}".format(e))
            pass

    return count

