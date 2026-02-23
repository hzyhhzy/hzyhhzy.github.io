class BMS: # Bashicu matrix system
    def __init__(self, mat): # mat: 2D list
        self.m = mat

    def isZero(self): # 0, is empty
        return len(self.m) == 0

    def isSuccessor(self): # successor ordinals, last row is all 0
        return all(self.m[-1][i] == 0 for i in range(len(self.m[-1])))

    def expand(self,n): # [n] operation on limit ordinals
        # find the last non-zero element on the last row
        last_non_zero = len(self.m[-1]) - 1
        while last_non_zero >= 0 and self.m[-1][last_non_zero] == 0:
            last_non_zero -= 1
        # find the parent

class PrSS: # Primitive sequence system, can express ordinals < ε0
    def __init__(self, seq): # seq: integer list
        self.s = seq

    def isZero(self): # 0, is empty
        return len(self.s) == 0

    def isSuccessor(self): # successor ordinals, last element is 0
        return self.s[-1] == 0

    def sub1(self): # subtract 1 if is successor
        assert(self.isSuccessor()) # should be a successor ordinal
        self.s.pop()
        
    def expand(self,n): # [n] operation on limit ordinals
        assert(not self.isZero() and not self.isSuccessor()) # should be a limit ordinal
        # find the last element smaller than self.s[-1]
        root = len(self.s) - 1
        while self.s[root] >= self.s[-1]:
            root -= 1
            assert(root >= 0) # always have a parent unless self.s[-1] is 0
        # remove self.s[-1]
        self.s = self.s[:-1]
        # append the part from the root to the last element n times
        copy_part = self.s[root:]
        if(n > 1):
            self.s = self.s + copy_part * (n - 1)

def HH(a, n) -> int: # Hardy hierarchy. HH(ω^a, n) is strictly equal to FGH(a, n)
    if a.isZero():
        return n
    elif a.isSuccessor():
        a.sub1()
        return HH(a, n+1)
    else:
        a.expand(n)
        return HH(a, n)

n = 2
initial_ordinal=PrSS([i for i in range(n)]) # = ω^ω^ω...^ω = ε0[n]
print(HH(initial_ordinal, n)) # Notice that HH(ε0[n]) is strictly equal to FGH(ε0[n-1])

test_s=PrSS([0,1,2,2,1,2,2])
test_s.expand(5)
print(test_s.s)


n = 2
a = [n] # a represents the ordinal = ω^a[0] + ω^a[1] + ... + ω^a[-1].
while(len(a) > 0): # Hardy hierarchy on ordinals .
    if a[-1] == 0: # a is a successor ordinal
        a.pop() # subtract 1
        n += 1
    else: # a is a limit ordinal
        v = a[-1]
        a.pop()
        a.extend([v-1,]*n)
print(n)


n = 100 
p = PrSS([i for i in range(n+1)]) # represent Goodstein(2↑↑n)
# Goodstein sequences's rule is completely the same as Hardy hierarchy on ordinals.
# So Goodstein(2↑↑n) is strictly equal to HH(ω↑↑n, 3) - 3
step = 3
while(not p.isZero()):
    if(not p.isSuccessor()):
        p.sub1()
        step += 1
    else:
        p.expand(step)