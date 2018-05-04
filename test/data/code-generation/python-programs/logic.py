def justOnePerson(x, y):
  return ((x == 'jen') and not (y == 'justin')) or (not(x == 'jen') and (y == 'justin'))

def eitherIsTrue(x, y):
  return x or y

def evenNumber(x):
    return x % 2 == 0

def isOdd(x):
  if not evenNumber(x):
    return 'The number is odd'

print(justOnePerson('jen', 'justin'))
