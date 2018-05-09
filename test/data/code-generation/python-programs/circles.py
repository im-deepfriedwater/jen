import random
import math
def circleEstimator(radius, throws):
  hits = 0
  remainingThrows = throws
  randomX = 0
  randomY = 0
  while(remainingThrows > 0):
    randomX = random.random() * radius * 2
    randomY = random.random() * radius * 2
    if (distanceBetween(randomX, randomY, radius, radius) < radius):
      hits = hits + 1
    remainingThrows = remainingThrows - 1
  return (hits / throws) * 4 * radius

def sqrt(num):
  root = num / 2
  iterations = 0
  while(iterations < 20):
    root = (root + num / root) / 2
    iterations = iterations + 1
  return root

def distanceBetween(x1, y1, x2, y2):
  return sqrt(math.pow((y2 - y1), 2) + math.pow((x2 - x1), 2))

def circleExact(radius):
  return math.pi * math.pow(radius, 2)


def checkDartsUntilPrecise(decimals, radius):
  throws = 50
  circleEst = circleEstimator(radius, throws)
  circleEx = circleExact(radius)
  while((circleEst - circleEx) * decimals > 1 or (circleEst - circleEx) * decimals < -1):
    throws = throws * 2
    circleEst = circleEstimator(radius, throws)
  return throws

print (sqrt(2)) # should be about 1.414
print (sqrt(100)) # should be about 10
print (distanceBetween(0, 1, 0, 3)) # should be 2
