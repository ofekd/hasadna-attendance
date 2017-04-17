import queries
from colors import ColorEngine
import exceptions


def count_and_print_n_arrivals():
    print("Choose lower bound N (the times of arrival): ")
    n = input()
    res = queries.count_and_print_n_arrivals(n)
    ColorEngine.print('Overall {0} volunteers arrived at least {1} times:'.format(len(res), n), ColorEngine.BOLD)
    for name in res:
        print(name)


def count_inactive_x_weeks():
    #option_is_in_development()
    print("Choose lower bound N (the inactive period in weeks): ")
    n = input()
    res = queries.count_inactive_x_weeks(n)
    ColorEngine.print('Overall {0} volunteers were inactive for at least {1} weeks:'.format(len(res), n), ColorEngine.BOLD)
    for name in res:
        print(name)


def came_x_times_and_never_returned():
    print("Choose lower bound N (the times of arrival before never returned): ")
    n = input()
    res = queries.came_x_times_and_never_returned(n)
    ColorEngine.print('Overall {0} volunteers came {1} weeks and then never returned:'.format(len(res), n), ColorEngine.BOLD)
    for name in res:
        print(name)


def average_of_arrivals_in_n_weeks():
    print("Choose lower bound N indicating the last n weeks to calculate the average on: ")
    n = input()
    res = queries.average_of_arrivals_in_n_weeks(n)
    for r in res:
        arrival_avg = r[1] * 100
        if arrival_avg > 100:
            arrival_avg = 100 # for cases where volunteer came more than one time in a week.
        ColorEngine.print('Volunteer: {0}, average of arrivals in the last {1} weeks is: {2:.0f}%.'
                          .format(r[0], n, arrival_avg), [])


def my_quit_fn():
    raise SystemExit


def option_is_in_development():
    print("This option is still in development")
    raise exceptions.InDevelopment


def invalid():
    print("INVALID CHOICE!")

menu = {"1": ("Count and display how many volunteers arrived N times", count_and_print_n_arrivals),
        "2": ("Count how many volunteers were inactive for at least N weeks", count_inactive_x_weeks),
        "3": ("Count how many volunteers came at least N weeks and never returned (were inactive for at least 3 weeks)",
                came_x_times_and_never_returned),
        "4": ("Average of arrivals in the last N weeks", average_of_arrivals_in_n_weeks),
        "5": ("Quit",my_quit_fn)}


def show_menu():
    for key in sorted(menu.keys()):
        ColorEngine.print(key+":" + menu[key][0], [ColorEngine.BLUE, ColorEngine.BOLD])

    while(True):
        try:
            print("Make A Choice:")
            ans = input()
            menu.get(ans,[None, invalid])[1]()
        except exceptions.InDevelopment as e:
            pass
