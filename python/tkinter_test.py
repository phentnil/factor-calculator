from tkinter import *
root = Tk()
t_entry = StringVar(root)


def calculate_callback():
    t_val = t_entry.get()
    target = 0
    if t_val.isdigit():
        target = int(t_val)
        # find target and display
    print(type(t_val), ':[', t_val, ']', ':', type(target), ':', target)


def kc_window_start(root=None):
    if root is None:
        raise Error('Root is None?')
    first_frame = Frame(root)
    first_frame.pack()
    L1 = Label(first_frame, text='Target')
    E1 = Entry(first_frame, textvariable=t_entry)
    B1 = Button(first_frame, text='Calculate', command=calculate_callback)
    L1.pack(side=LEFT)
    E1.pack(side=LEFT, after=L1)
    B1.pack(side=RIGHT)


def main(root=None):
    if root is None:
        root = Tk()
    kc_window_start(root)


if __name__ == '__main__':
    main(root)
