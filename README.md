# jen

![jen-logo](images/logo.png)



## Introduction

jen is a scripting language meant to be your new best friend. Drawing inspiration from JavaScript, Python, and some creative features from Go, jen provides a pleasant and happy programming experience for all your high level needs. jen's powerful type system provides expressiveness, but also watches your back to prevent head-scratching type errors. With conciseness, elegance, and functionality, jen works hard as a language so you don't have to.



## Grammar



## List of Features

- Strong and Static typing
- Scripting language
- Inferred typing
- Multiple return values
- Static scoping



## Comments
```
; This is a single line comment

;;
   This is a multiple line comment.
;;
```



## Type

- **Constants** must start with uppercase letters followed by uppercase letters, numbers, and underscores
- **Variables** must start with a lowercase letter or underscore and can be followed by both lower and upper case letters, numbers, and underscores


```
; Examples of constants
HELLO := 'jen'
1THERE := 1
LULULEMON123 := true

; Examples of variables
jenEator := 'pho'
jenErator = 'ramen'
_JEN := 'udon'

; Will crash at compile time
1dog := 'corgi'
$myFortune := 2
Kbbq := {'Budnamu': 14.99, 'Road-to-seoul': 22.99}
```



### Primitive Types

- string
- boolean
- char
- number
- list (homogenous)
- object
- any
- void
- error



### Sum and Product Typing

jen allows the user to create custom types

```
; This type alias can be either a string or number
type stringOrNumber: string | number

; This type alias is list of stringOrNumber
type listStringOrNumber: list stringOrNumber

;TODO: ask Toal about Product typing
```



### Error Type

Since jen does not have exceptions, there is a built in error type called **err**. **err** has two different potential values: **errTrue** or **errFalse**.

```
; Example of using the err type
result, error := someFunction()
if error == errorTrue {
    print('File could not open')
}
```



### Declaration and Assignment

In jen, variables must be declared using the **:=** syntax. Without using this first, jen will error out at compile time. For variable reassignment, jen requires the **=** syntax. jen also allows parallel declaration and assignment as well.

```
; Variable initialization/declaration with inferred typing
x := 1

; Reassigning declared variables
x = 2

; Will crash due to type conflict
x = 'hello'

; Parallel declaration
a, b := "eats", "pants"

; Parallel assignment
a, b = "smol", "puppers"
```



### Ternary

```
; An example of how to call a Ternary
x := 1 > 2 ? 'one is greater' : 'two is greater'
```



### Operators

- Equal **==**
- Not equal **!=**
- Less than **<**
- Greater than **>**
- Less than or equal **<=**
- Greater than or equal **>=**

- Add **+**
- Subtract **-**
- Divide **/**
- Integer Divide **//**
- Modulus **%**
- Multiply **&ast;**

- Postfix increment **x++**
- Postfix decrement **x--**
- Assignment operators **+=**, **-=**, **&ast;=**, **/=**, **//=**, **%=**

- And **&&**
- Or **||**
- Not **!**
- XOR **&!&**




### Conditionals

```
x := 4
if x <= 3:
  print('Less than or equal to 3 ')
else if x >= 5:
  print('Greater than or equal to 5')
else:
  print('In between 3 and 5')
```



### Loops

```
iterable = [1, 2, 3, 4]

; Will print out the values in iterable
for i in iterable:
  print(i)

i := true

; Classic infinite loop example
while i:
  print(i)
```



## Examples

jen code is located on top, and the corresponding python code is right below it!

```
add: number, number -> number
add (a, b):
return a + b


def add(a, b):
    return a + b
```

```
fib: number -> number
fib(num):
   if num <= 1:
      return 1
   return fib(num - 1) + fib(num - 2)


def fib(num):
 if num <= 1:
     return 1
 return fib(num - 1) + fib(num - 2)
```

```
areaOfCircle: number -> number
areaOfCircle(radius):
   PI = Math.pi()
   return (PI * radius) ^ 2


def areaOfCircle(radius):
return Math.PI() * 2 * radius
```

```
type id: string | number

LIST_OF_EMPLOYEES := [1, 2, "3", "4", 5]

printEmployees: List id -> void
printEmployees(employeeList):
    for employeeId in employeeList:
        print(employeeId)


LIST_OF_EMPLOYEES = [1, 2, "thomas", "elizabeth", 5]

def printEmployees(employeeList):
    for employeeId in employeeList:
        print(employeeId)
```

```
checkIfBothPositive: number, number -> boolean, boolean
checkIfBothPositive(x, y):
    return x >= 0, y >= 0


def checkIfBothPositive(x, y):
   return (x >= 0, y >= 0)
```



### Developers

- Anthony Keba
- Elizabeth Shen
- Jen Shin
- Justin Torres
- Thomas O'Brien
- Tyler Edmiston
