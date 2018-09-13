My quick overview of Elm

# Resources
* [Official Syntax](https://elm-lang.org/docs/syntax)
* [Official Guide](https://guide.elm-lang.org/)
* [Package Docs](https://package.elm-lang.org/)
* [Learn X in Y](https://learnxinyminutes.com/docs/elm/)
* [So You Want to be a Functional Programmer by Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536) 

# Code Organization

## Modules 
* Code is organized in modules.
* The Module name must match it's file name.
* Modules are usually centered around a Type and its functions/utilities.
* Modules can be imported to be used by other modules.
* Sub modules are possible by nesting a module in a directory.
    * Ex: Parser.Utils should be in Parser/Utils.elm

## Packages
Libraries/External code is bundled and distributed via Packages

EX: elm-lang/core

* Core library provided by elm project
* Independently versioned
* Example Modules: Basics, Array, List, Maybe, Result, Set, ...



## Importing

Some modules are imported by default:
* Basics
* Debug
* List
* Maybe
* Result
* Signal

```elm
-- qualified imports (Preferred method of import)
import List -- List.map
import List as L -- L.map

-- open Imports
import List exposing (..) -- map, foldl, concat
import List exposing ( map, foldl ) -- map, foldl, List.concat
```

# Project Organization

* elm.json
    * Project metadata
    * Package dependencies

# Language

## Some syntactical differences with "typical" languages (not exhaustive)

* `/=` Inequality
* `not True` Boolean negation
* `++` string, array concat
* `//` Integer division
* `<<`, `>>` Function composition operators
* `<|`, `|>` Function application operator. I remember the direction by "pipe into".

## Built-in types
Bool, Int, Float, String, ...

## Data Structures
List, Array, Tuple, Set, Dict, Records, ...

## Records

Records are bags of data much like objects in Java, Javascript, etc.  However, Records only contain data, not functionality.  Also, all fields are defined statically and you cannot access a field that doesn't exist.

```elm
myPoint = {x = 1, y = 2}
```

Records, like all data in Elm, are immutable.  To update, elm efficiently clones the object and returns a new instance

```elm
point2 = { myPoint | x = 3 }
```

## Types

Elm is a strongly typed langague.  Types are inferred in elm and errors produce compilation errors.  You can and should define the signature of functions via type annotations.  The compiler will also validate these!

### Type Annotations

```elm
add: Int -> Int -> Int
add x y =
  x + y

{-
Note the chained return types.  This is because elm automatically curries all functions.  Because of this, each annotation is written as if a function can take one argument at a time. 
-}
```

```elm
-- Function arguments are enclosed in parens
map: (a -> b) -> List a -> List b
```

###  Type Variables

lowercased variables defining the dynamic types used within a function or data structure. Think Java Generics.
  ```java
  // In Java
  List<String> someJavaVar;
  ```

  ```elm
  -- In elm
  List a

  map: (a -> b) -> List a -> List b
  -- Since a != b, the type in b can, but does not have to match type a
  ```

#### Constrained Types

Type variables that limit the type allowed by the annotation
* number
* appendable
* compappend
* comparable

###  Type Aliases

Type Aliases are simply shorter names for a type defined elsewhere. These make it easy to reference the type in other places (functions, etc.). Also, this makes it easy to add fields to the type later on. 

```elm
type alias Rectangle2d 
  { x: Int 
  , y: Int
  , width: Int
  , height: Int
  }

intersect: Rectangle2d -> Rectangle2d -> Bool
intersect point, point =
-- ...
```


###  Custom Types/Union Types

You can think of these a bit as enums on steroids.  The items of the enum are called tags and they define the cardinality of the enum.  Further, you can attach variable data to each tag and switch/pattern match on the tag of the type.

The enum analogy breaks down a bit in that the tags themselves serve as constructor functions of the type and you can create instances of the tags.  As elm is a functional language, you can and will pass the Tag constructor function into other functions.  A core example is passing a tag of your custom message type `type Msg` into functions for Commands, Subscriptions, etc.

```elm
type Msg
  = UpdName
  | UpdAge
  | SubmitForm

type User
  = Regular String Int
  | Guest String

-- "Built-in" type from elm/core
type Maybe a
  = Just a
  | Nothing
```

## Language Fundamentals
* Functional, Immutable
* Mostly Pure Functions.  Side-effects quarentined to specific parts of the app via Commands, Subscriptions, etc.
* Functions auto-curry
```elm
{- This function takes two numbers and adds them together.
Since elm auto-curries, all type signatures have "interim" returns and appear as single argument
-}
add : number -> number -> number
add = x y
  x + y

let
  add10 = add 10
in
  List.map add10 [1,2,3] -- 11, 12, 13
```

# Tips

* Write block comments like this
```elm
{--
  -- This is a block comment that's commented out
  debug foo
--}

{--}
  -- Now this line is active just by adding } above 
  debug foo
--}
```
* Static or Default agurments should be specified first so you can curry the function and apply it.