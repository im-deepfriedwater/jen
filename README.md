# jen

![jen-logo](images/logo.png)

## Introduction

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
- Constants can be declared with uppercase letters([A-Z]) and/or numbers
- Variables must start with a lowercase letter or underscore


```
; Examples of constants
HELLO := 'jen'
1THERE := 1
LULULEMON123 := true

; Examples of variables
jEN := 'pho'
jEN = 'ramen'
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

### Sum/Product Typing
jen allows the user to create custom types

```
; This type alias can be either a string or number
type stringOrNumber: string | number

; This type alias is list of stringOrNumber
type listStringOrNumber: list stringOrNumber

Product Typing (To do, ask Toal)
```


### Assignment
In jen, variables must be declared using the **:=** syntax. Without using this first, jen will error out at compile time. For variable reassignment, jen requires the **=** syntax.

```
; Variable initialization/declaration with inferred typing
x := 1

; Reassigning declared variables
x = 2

; Will crash due to type conflict
x = 'hello'
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

```
;
add: number, number -> number
add (a, b):


```


### Anthony Keba, Elizabeth Shen, Jen Shin, Justin Torres, Thomas O'Brien, Tyler Edmiston
