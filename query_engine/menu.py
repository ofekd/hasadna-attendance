import queries
from colors import ColorEngine


# consider adding color handler instead of hardcoded ANSI escapes.
def count_n_arrivals():
    print("Choose lower bound N (the times of arrival): ")
    n = input()
    res = queries.count_n_arrivals(n)
    ColorEngine.print('Overall {0} volunteers arrived at least {1} times.'.format(res, n), ColorEngine.BOLD)


def my_quit_fn():
    raise SystemExit


def invalid():
    print("INVALID CHOICE!")

menu = {"1": ("Count how many volunteers arrived N times", count_n_arrivals),
        "2": ("Quit",my_quit_fn)}


def show_menu():
    for key in sorted(menu.keys()):
        ColorEngine.print(key+":" + menu[key][0], [ColorEngine.BLUE, ColorEngine.BOLD])

    while(True):
        print("Make A Choice:")
        ans = input()
        menu.get(ans,[None, invalid])[1]()
