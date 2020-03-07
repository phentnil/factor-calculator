class Result:
    def __init__(self, total, diff, diffi, units):
        self.total = total or None
        self.diff = diff or None
        self.diffi = diffi or None
        self.units = units or []

    def out(self):
        thisunits = ''
        for i in range(len(self.units)):
            thisunits += str(self.units[i])
            if i + 1 < len(self.units):
                thisunits += ', '
        output = '[Sum: {:>4d}]'.format(self.total)
        output += '[Variance: {: =+4d}'.format(self.diff)
        output += ' ({:=+.2%})]'.format(self.diffi)
        output += '[Units: {:s}]'.format(thisunits)
        update_status(output)


def init():
    update_status('Initializing variables.')
    global units, units2
    units = [
        {'unit': 528, 'qty': 1},
        {'unit': 532, 'qty': 2},
        {'unit': 533, 'qty': 4},
        {'unit': 535, 'qty': 3},
        {'unit': 536, 'qty': 1},
        {'unit': 554, 'qty': 1},
        {'unit': 565, 'qty': 2},
        {'unit': 576, 'qty': 6},
        {'unit': 1089, 'qty': 1},
        {'unit': 1097, 'qty': 5},
        {'unit': 1100, 'qty': 4}
    ]
    units2 = []
    for x in units:
        for _ in range(x['qty']):
            units2.append(x['unit'])
    print(f'units2 length: {len(units2)}')


def update_status(fs=f'{1+1}'):
    from time import perf_counter as pc
    print(f'[{"{:.4f}".format(pc())}s] {fs}')


def simple_combos():
    results = []
    for u in units:
        div = target / u['unit']
        divr = int(round(div))
        if divr > u['qty']:
            continue
        total = u['unit'] * divr
        if total < tmin or total > tmax:
            continue
        diff = total - target
        diffi = diff / target
        newunits = []
        for _ in range(divr):
            newunits.append(u['unit'])
        results.append(Result(total, diff, diffi, newunits))
    return results


def get_combos():
    from itertools import combinations as comb, chain
    res = []
    update_status('Beginning search for all possible combos within ±10%')
    for item in chain.from_iterable(comb(units2, n)
                                    for n in range(1, len(units2) + 1)):
        if sum(item) < tmin or sum(item) > tmax:
                continue
        res.append(list(item))
    update_status('Search complete.')
    print(res)
    return res


def print_combos(combos=[]):
    for r in sorted(combos, key=lambda u: abs(u.diffi)):
        r.out()


def main():
    global target, tmin, tmax, root, t_entry
    from tkinter import Tk, StringVar
    init()
    root = Tk()
    t_entry = StringVar(root)
    while True:
        stdout = 'Enter a numeric target value to calculate best combos. '
        stdout += 'Or enter "quit" to quit the program.'
        update_status(stdout)
        uinput = input()
        if uinput.isdigit():
            from math import ceil, floor
            target = int(uinput)
            tmin = int(ceil(target * 0.9))
            tmax = int(floor(target * 1.1))
            update_status(f'Target: {target} ({tmin} - {tmax})\n')
            combos = simple_combos()
            if len(combos) < 1:
                update_status('No simple combos found!')
                if input('Check for other combinations?').startswith('y'):
                    update_status('Checking other combinations.')
                    combos = get_combos()
                    if len(combos) > 0:
                        update_status(f'Found {len(combos)} combinations!')
                    else:
                        update_status(f'No combos found!')
            else:
                update_status(f'Found {len(combos)} simple combinations!')
                print_combos(combos)
                if input('Check for other combinations?').startswith('y'):
                    update_status('Checking other combinations.')
                    newcombos = get_combos()
                    update_status(f'Found {len(newcombos)} new combinations!')
                    print_combos(newcombos)
        elif uinput.upper() == 'QUIT':
            return
        else:
            update_status(f'{uinput.isdigit()}, {uinput}')


if __name__ == '__main__':
    main()
