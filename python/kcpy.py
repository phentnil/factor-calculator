# python
# function main (target) {
#   if ("number" !== typeof target) {target = 3000;}
#   const kcUnits = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];
#   kcUnits.forEach((item, index, array) => {
#    item.multiples = [];
#    for (let i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
#   });
#   console.log("Target:",target);
#   printUnits(JSON.parse(JSON.stringify(kcUnits)));
#   getMatches(target, JSON.parse(JSON.stringify(kcUnits)));
# }
# window.onload = main;
# https://www.geeksforgeeks.org/reading-excel-file-using-python/


def rand_target():
    from random import randint
    return randint(1, 5000)


def dcl(list_to_copy=[]):
    if len(list_to_copy) >= 1:
        from copy import deepcopy
        return deepcopy(list_to_copy)


def sort_by_quantity(val):
    return val['qty']


def sort_by_diff(val):
    return abs(val['diff'])


def get_matches(target=3000, inUnits=[]):
    if len(inUnits) < 1:
        return None
    from math import floor
    units = dcl(inUnits)
    matches = []
    results = []
    while len(units):
        item = units.shift()
        u = item['unit']
        m = item['multiples']
        for i in range(len(m)):
            match = {}
            v = m[i]
            match['diff'] = v - target
            match['combination'] = str(u) + 'x' + str(i)
            match = {'unit': u, 'quantity': i, 'value': v}
            if abs(match['diff']) < floor(target * 0.1):
                matches.append(match)
    results.append(matches)
    return results


def print_matches(matches=[]):
    if len(matches) < 1:
        return
    matches.sort(key=sort_by_diff)
    matchesOut = 'Unit | Qty | Value | Difference\n'
    for i in range(len(matches)):
        if matches[i]['unit'] < 1000:
            matchesOut += ' '
        matchesOut += matches[i]['unit']
        matchesOut += ' |  '
        if matches[i]['quantity'] < 10:
            matchesOut += ' '
        matchesOut += matches[i]['quantity']
        matchesOut += ' |  '
        if matches[i]['value'] < 1000:
            matchesOut += ' '
        matchesOut += matches[i]['value']
        matchesOut += ' | '
        if matches[i]['diff'] >= 0:
            matchesOut += '+'
        matchesOut += matches[i]['diff']
        if (i + 1) < len(matches):
            matchesOut += '\n'
    print(matchesOut)


# def find_target(target=None, units=[]):
#     result = {'generated': False}
#     if target is None:
#         result['generated'] = True
#         target = rand_target()
#     result['target'] = target
#     sum_list = []
#     div = new_target = unit_sum = next_unit = 0
#     units_clone = dcl(units)
#     while unit_sum < (target * 0.9):
#         if len(units_clone) < 1:
#             break
#         new_target = target - unit_sum
#         for i in range(len(units_clone)):
#             div = new_target / units_clone[i]['unit']
#             units_clone[i]['diff'] = div - round(div)
#         units_clone.sort(key=sort_by_diff)
#         if units_clone[0]['qty'] < 1:
#             raise Exception('Quantity less than 1?', units_clone[0])
#         next_unit = units_clone[0]['unit']
#         if units_clone[0]['qty'] > 1:
#             units_clone[0]['qty'] -= 1
#         else:
#             removed_unit = units_clone[0]
#             units_clone.remove(removed_unit)
#         sum_list.append(next_unit)
#         unit_sum += next_unit
#     result['sum'] = unit_sum
#     result['dev_int'] = unit_sum - target
#     result['dev_pct'] = result['dev_int'] / target
#     result['sum_list'] = dcl(sum_list)
#     return result


# def display_result(result=None):
#     if result is not None:
#         rg = 'Random unit' if result['generated'] else 'Target unit'
#         rp = '' if result['dev_int'] < 0 else '+'
#         rd = rp + str(result['dev_int'])
#         rd += ' (' + rp + format((result['dev_pct'] * 100), '.5g') + '%)'
#         ru = 'Units to use:'
#         for i in result['sum_list']:
#             rx = str(i) if len(str(i)) >= 4 else ' ' + str(i)
#             ru += '\n\t' + rx
#         if abs(result['dev_pct']) >= 0.1:
#             rd += ' ALERT: OUT OF RANGE'
#         print(rg + ': ' + str(result['target']))
#         print('Closest result: ' + str(result['sum']))
#         print('Variance from target: ' + rd)
#         print(ru)


def pull_xl_values():
    import xlrd
    sheet = xlrd.open_workbook('.\\kcpy.xlsx').sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    if cols == 2:
        units = []
        for row in range(rows):
            first = sheet.cell_value(row, 0)
            second = sheet.cell_value(row, 1)
            if isinstance(first, float) and isinstance(second, float):
                units.append({'unit': int(first), 'qty': int(second)})
        return units
    else:
        return 'columns did not equal to 2'


def get_input():
    import pyautogui
    target_units = None
    prompt = 'Enter target dose units. (type "quit" to exit)'
    while target_units is None:
        target_units = pyautogui.prompt(prompt)
    if target_units.isdigit():
        return int(target_units)
    else:
        from re import search
        if search('^[Qq][Uu][Ii][Tt]$', target_units):
            return True
    return False


def main():
    target = get_input()
    if isinstance(target, bool) and target:
        return True
    units = pull_xl_values()
    if isinstance(target, int):
        target_result = get_matches(target=target, units=units)
        print_matches(target_result)
    else:
        target_result = get_matches(units=units)
        print_matches(target_result)
    return False


if __name__ == '__main__':
    quit = False
    while not quit:
        quit = main()
