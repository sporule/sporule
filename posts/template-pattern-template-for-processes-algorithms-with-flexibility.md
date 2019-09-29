---
title: "Template Pattern - Template for Processes/Algorithms with Flexibility"
author: "Sporule"
date: "2019-04-10"
categories: "design pattern"
tags: "template pattern,python"
---

## What is Template Pattern

Template pattern sets the template for a logical process / algorithms that can be implemented in its children class.

In addition, using a hook in the template pattern provides the flexibility for its children class to exectue functions that are special for the children class.

## Template Pattern Implementation

The scenario of this example is cooking a meal.

We start from the parent class Meal, it has a function ConvertToMeal() which contains all the logic of the process for turning ingredients to a meal.

It also includes a function Hook() which is empty. Children class can implement the Hook() function to bring their own process into the template.

This Hook() is very useful and I will explain it later.

```python
class Meal():
    def __init__(self,name):
        self._name=name
    
    def ConvertToMeal(self):
        self.Prepare()
        self.Cook()
        self.Hook()

    def Prepare(self):
        raise NotImplementedError("You need to implement this funcion")
    
    def Cook(self):
        raise NotImplementedError("You need to implement this funcion")
    
    def Hook(self):
        pass
```

We also have 2 child classes that inherit from the Meal class. 

Vegetable does not have any function to add into its cooking process, so it does not need to override the function Hook().

Meal has an extra process by providing a wine, so it implements the function Hook()

```python
class Vegetable(Meal):  

    def Prepare(self):
        print(self._name+": preparing vegetables")
    
    def Cook(self):
        print(self._name +": stir frying vegetables")

class Meat(Meal):  

    def Prepare(self):
        print(self._name+": preparing Meat")
    
    def Cook(self):
        print(self._name +": grilling meat")
    
    def Hook(self):
        print(self._name+": serving with wine")
```

Run Result:

```python
pork = Meat("pork")
cabbage = Vegetable("cabbage")
pork.ConvertToMeal()
#output pork: preparing Meat
#output pork: grilling meat
#output pork: serving with wine
cabbage.ConvertToMeal()
#output cabbage: preparing vegetables
#output cabbage: stir frying vegetables
```

### Diagram

![Template Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/TemplatePattern/TemplatePattern.png)

## Example Code

[Template Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/TemplatePattern)

## Credit

<< Head First Design Patterns >>
