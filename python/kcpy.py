#python
#https://www.geeksforgeeks.org/reading-excel-file-using-python/
def rand_target():
	from random import randint
	return randint(1,5000)

def dcl(list_to_copy=[]):
	if len(list_to_copy)>=1:
		from copy import deepcopy
		return deepcopy(list_to_copy)

def sort_by_diff(val):
	return abs(val['diff'])

def find_target(target=None,units=[]):
	result={'generated':False}
	if target is None:
		result['generated']=True
		target=rand_target()
	result['target']=target
	sum_list=[]
	div=new_target=unit_sum=next_unit=0
	units_clone=dcl(units)
	while unit_sum<(target*0.9):
		if len(units_clone)<1:
			break
		new_target=target-unit_sum
		for i in range(len(units_clone)):
			div=new_target/units_clone[i]['unit']
			units_clone[i]['diff']=div-round(div)
		units_clone.sort(key=sort_by_diff)
		if units_clone[0]['qty']<1:
			raise Error('Why the fuck is this quantity less than 1?',units_clone[0])
		next_unit=units_clone[0]['unit']
		if units_clone[0]['qty']>1:
			units_clone[0]['qty']-=1
		else:
			removed_unit=units_clone[0]
			units_clone.remove(removed_unit)
		sum_list.append(next_unit)
		unit_sum+=next_unit
	result['sum']=unit_sum
	result['dev_int']=unit_sum-target
	result['dev_pct']=result['dev_int']/target
	result['sum_list']=dcl(sum_list)
	return result

def display_result(result=None):
	if result is not None:
		rg='Random unit' if result['generated'] else 'Target unit'
		rp='' if result['dev_int']<0 else '+'
		rd=rp+str(result['dev_int'])+' ('+rp+format((result['dev_pct']*100),'.5g')+'%)'
		ru='Units to use:'
		for i in result['sum_list']:
			rx=str(i) if len(str(i))>=4 else ' '+str(i)
			ru+='\n\t'+rx
		if abs(result['dev_pct'])>=0.1:
			rd+=' ALERT: OUT OF RANGE'
		print(rg+': '+str(result['target']))
		print('Closest result: '+str(result['sum']))
		print('Variance from target: '+rd)
		print(ru)

def pull_xl_values():
	import xlrd
	sheet=xlrd.open_workbook('.\\kcpy.xlsx').sheet_by_index(0)
	rows=sheet.nrows
	cols=sheet.ncols
	if cols==2:
		units=[]
		for row in range(rows):
			first=sheet.cell_value(row,0)
			second=sheet.cell_value(row,1)
			if type(first)==type(1.0) and type(second)==type(1.0):
				units.append({'unit': int(first), 'qty': int(second)})
		return units
	else:
		return 'columns did not equal to 2'

def get_input():
	import pyautogui
	target_units=None
	while target_units is None:
		target_units=pyautogui.prompt('Enter target dose units. (type "quit" to exit)')
	if target_units.isdigit():
		return int(target_units)
	else:
		from re import search
		if search('^[Qq][Uu][Ii][Tt]$',target_units):
			return True
	return False

def main():
	target=get_input()
	if type(target)==type(True) and target:
		return True
	units=pull_xl_values()
	if type(target)==type(1):
		target_result=find_target(target=target,units=units)
		display_result(target_result)
	else:
		target_result=find_target(units=units)
		display_result(target_result)
	return False

if __name__ == '__main__':
	quit=False
	while not quit:
		quit=main()
