import queries
from colors import ColorEngine
import exceptions

def count_n_arrivals():
    print("Choose lower bound N (the times of arrival): ")
    n = input()
    res = queries.count_n_arrivals(n)
    ColorEngine.print('Overall {0} volunteers arrived at least {1} times.'.format(res, n), ColorEngine.BOLD)


def count_inactive_x_weeks():
    #option_is_in_development()
    print("Choose lower bound N (the inactive period in weeks): ")
    n = input()
    res = queries.count_inactive_x_weeks(n)
    ColorEngine.print('Overall {0} volunteers were inactive for at least {1} weeks.'.format(res, n), ColorEngine.BOLD)


def came_x_times_and_never_returned():
    print("Choose lower bound N (the times of arrival before never returned): ")
    n = input()
    res = queries.came_x_times_and_never_returned(n)
    ColorEngine.print('Overall {0} volunteers came {1} weeks and then never returned.'.format(res, n), ColorEngine.BOLD)


def my_quit_fn():
    raise SystemExit


def option_is_in_development():
    print("This option is still in development")
    raise exceptions.InDevelopment


def invalid():
    print("INVALID CHOICE!")

menu = {"1": ("Count how many volunteers arrived N times", count_n_arrivals),
        "2": ("Count how many volunteers were inactive for at least N weeks", count_inactive_x_weeks),
        "3": ("Count how many volunteers came at least N weeks and never returned (were inactive for at least 3 weeks)",
                came_x_times_and_never_returned),
        "4": ("Quit",my_quit_fn)}


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
