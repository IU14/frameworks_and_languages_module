from example import *

def test_add():
    assert add(-1, 1) == 0
    assert add(1, 2) == 3
    assert add(1, -2) == -1
    assert add(1000000000000000000, 2) == 1000000000000000002

def test_multiply():
    assert multiply (0, 0) == 0
    assert multiply (1, 3) == 3 
    assert multiply (20, 5) == 100  

def test_division():
    assert div (100 , 0) == 10
    assert div (50, 2 ) ==25

    