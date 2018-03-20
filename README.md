# jen
<p align="center">
<img src= "images/logo.png" height="400">
</p>



## Introduction

jen is a scripting language meant to be your new best friend! Drawing inspiration from JavaScript, Python, Go, and Typescript's sum type, jen provides a pleasant and happy programming experience for all your high level needs. jen's powerful type system provides expressiveness, but also watches your back to prevent head-scratching type errors. With conciseness, elegance, and functionality, jen works hard as a language so you don't have to!



## Grammar

```
Jen {
  Program            = newLine* Body newLine*
  Body               = (Statement newLine* | Expression newLine*)*
  Suite              = newLine* indent Body dedent
  Statement          = Conditional | Loop | Declaration | Assignment | FuncDec
                     | TypeDec | ReturnExp
  Expression         = (Exp0 "?" Expression ":" Expression)                -- ternary
                     | Exp0
  Exp0               = Exp0 "&&" Exp1                                      -- and
                     | Exp0 "||" Exp1                                      -- or
                     | Exp0 "&!&" Exp1                                     -- xor
                     | Exp1
  Exp1               = (Exp1 addop Exp2)                                   -- binary
                     | Exp2
  Exp2               = (Exp2 mulop Exp3)                                   -- binary
                     | Exp3
  Exp3               = (Exp3 "^" Exp4)                                     -- binary
                     | Exp4
  Exp4               = (Exp4 relop Exp5)                                   -- binary
                     | Exp5
  Exp5               = "!" Exp5                                            -- not
                     | Exp6
  Exp6               = Exp6 "." FuncCall                                   -- binary
                     | Exp6 "." id                                         -- accessor
                     | Exp7
  Exp7               = numLiteral
                     | stringLiteral
                     | RecordLiteral
                     | SubscriptExp
                     | FuncCall
                     | id ~Expression                                     -- id
                     | booleanLiteral
                     | errLiteral
                     | List
                     | "(" Expression ")"                                  -- parens
  SubscriptExp       = id "[" Expression "]"
  List               =  "[" ListOf<Expression, ","> "]"
  NonemptyExpressionList
                     = NonemptyListOf<Expression, ",">
  Loop               = For | While
  For                = "for" NonemptyListOf<id, ","> "in" Expression ":" Suite
  While              = "while" Expression ":" Suite
  FuncDec            = Annotation newLine Signature newLine Suite
  Annotation         = (varId | constId) ":" ParamTypes "->" ParamTypes
  ParamTypes         = NonemptyListOf<Type, ",">
  Signature          = (varId | constId) "(" Params "):"
  Params             = NonemptyListOf<varId, ",">
  ReturnExp          = "return" ListOf<Expression, ",">
  FuncCall           = (varId | funcId | SubscriptExp) "(" ListOf<Expression, ","> ")"
  TypeDec            = "type" varId SumType
  Declaration        = Ids ":=" NonemptyExpressionList
  Assignment         = Ids "=" NonemptyExpressionList
  Conditional        = "if" Expression ":" Suite (ElseIfCondition)* (ElseCondition)?
  ElseCondition      = "else" ":" Suite
  ElseIfCondition    = "else if" Expression ":" Suite
  id                 = varId | constId | packageId
  Ids                = NonemptyListOf<(SubscriptExp | id), ",">
  keyword            = ("if" | "while" | "else" | "for" | "else if" | "print" | "true"
                     | "false" | "typeof" | "return" | "type" | "ok" | "err") ~idrest
  idrest             =  "_" | alnum
  varId              = ~keyword ("_" | lower) idrest*
  constId            = upper ("_" | upper | digit)* ~lower
  packageId          = upper idrest*
  funcId             = "typeof" | "print"
  Type               = basicType | ListType | SumType | RecordType | id
  basicType          = "string" | "boolean" | "char" | "number"
                     | "object" | "any" | "void" | "error"
  ListType           = "list"+ ( id | basicType | SumType ) ~"list"
  SumType            = (basicType | id) "|" (basicType | id) ("|" (basicType | id))*
  RecordType         = "{" NonemptyListOf<Field, ","> "}"
  Field              = id ":" Type
  FieldValue         = id ":" Expression
  RecordLiteral      = "{" NonemptyListOf<FieldValue, ","> "}"
  booleanLiteral     = "true" | "false"
  errLiteral         = "ok" | "err"
  numLiteral         = digit+ ("." digit+)?
  stringLiteral      = "\"" (~"\"" char | "'")* "\""
                     | "'" (~"'"char | "\"")* "'"
  char               = escape
                     | ~";" ~newLine any
  addop              = "+" | "-"
  mulop              = "*" | "%" | "//" | "/%" | "/"
  relop              = "<=" | ">=" | ">" | "<" | "==" | "!="
  escape             = "\\n" | "\\"
  space              := " " | comment
  newLine            = "\r"? "\n"
  comment            = ";" ~";" (~newLine ~";" any)*                              -- comment
                     | multiLineComment
  multiLineComment   = ";;" (~";" any)* ";;"
  indent             =  "⇨"
  dedent             =  "⇦"
}

```


## List of Features

- Strong and Static typing
- Scripting language
- Inferred typing
- Multiple return values
- Static scoping




## Type



### Primitive Types

- string
- boolean
- number
- list (homogenous)
- object
- any
- void
- error



### Constants and Variables

**Constants** must start with uppercase letters followed by uppercase letters, numbers, and underscores.

**Variables** must start with a lowercase letter or underscore and can be followed by both lower and upper case letters, numbers, and underscores.

```
; Examples of constants
HELLO2018 := 'jen'
LULU_LEMON := true

; Examples of variables
jen3at0r := 'pho'
jenErator = 'ramen'
_JeN_01 := 'udon'

; Will crash at compile time
1dog := 'corgi'
$myFortune := 2
Kbbq := {'Budnamu': 14.99, 'Road-to-seoul': 22.99}
```




### Sum Typing

jen allows the user to create custom types.

```
; This type alias can be either a string or number
type stringOrNumber string | number

; This type alias is list of stringOrNumber
type listStringOrNumber list stringOrNumber

```



### Error Type

Since jen does not have exceptions, there is a built in error type called **error**. **error** has two different potential values: **ok** or **err**.

```
; Example of using the err type
result, errorCheck := someFunction()
if errorCheck == ok {
    print('File could not open')
}
```



## Operators

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
- DivMod **/&**
- Multiply **&ast;**
- Postfix increment **x++**
- Postfix decrement **x--**
- Assignment operators **+=**, **-=**, **&ast;=**, **/=**, **//=**, **%=**
- And **&&**
- Or **||**
- Not **!**
- XOR **&!&**



## Declaration and Assignment

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



## Function Declaration

```
; Declares the function isOdd with type annotation and function signature
isOdd: number -> boolean
isOff(x):
  return x % 2 != 0
```



## Ternary

```
; An example of how to write a ternary
x := 1 > 2 ? 'one is greater' : 'two is greater'
```



## Conditional

```
x := 4
if x <= 3:
  print('Less than or equal to 3 ')
else if x >= 5:
  print('Greater than or equal to 5')
else:
  print('In between 3 and 5')
```



## Loop

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



## Comments

```
; This is a single line comment

;;
   This is a multiple line comment.
;;
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
   return PI * radius ^ 2


def areaOfCircle(radius):
  return math.pi * radius ** 2
```

```
type id: string | number

LIST_OF_EMPLOYEES := [1, 2, "thomas", "elizabeth", 5]

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



## Developers

- Anthony Keba
- Elizabeth Shen
- Jen Shin
- Justin Torres
- Thomas O'Brien
- Tyler Edmiston
- Ray Toal
