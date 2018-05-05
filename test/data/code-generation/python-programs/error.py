err = 'err'
ok = 'ok'
def double(x):
  return x * 2

result, errorValue = double('3'), err
if(errorValue == err):
  print('Could not double')
else:
  print(result)
