---
title: "Strategy Pattern - Has-A can be better than IS-A"
author: "Sporule"
date: "2018-11-23"
categories: "design pattern"
tags: "strategy pattern"
---

## What is Strategy Pattern

- From the Book: The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
- From me: Strategy Pattern is trying to resolve the problem of inheritance by using composition( Has-a rather than Is-a ).

## The Problem

In this example, we own different cars and we have different ways(or no way) to charge their batteries.

Please aware that the example may be non sense.

For example :

| Car Type          | Where to Charge |
| ----------------- | --------------- |
| Eletric Car       | At Home         |
| Plugin Hybrid Car | At Station      |
| Sports Car        | Can't Charge    |

## Inheritance Style Implementation

By using inheritance, we can simply create a base model Car with a function charge().

```python
class Car():
    """Base class of all cars"""

    def charge(self):
        print("Charge my car")
```

Then implement the charge()  individually in the children class.

``` python
class Sports_Car(Car):
    def __init__(self, registration):
        super().__init__(registration)

    def display(self):
        print("I am a Sports Car")

    def charge(self):
        print("I can't charge my car")
```

However, it is very hard to reuse the code and keep consistent of all the children.

## Strategy Pattern Style Implementation:

It is similar as the inheritance style, we simply create a base model Car with a property charge_behaviour.

```python
class Car():
    """Base class of all cars"""

    @property
    def charge_behaviour(self):
        return self._charge_behaviour
```

Instead of individual implementation, we create an interface/abstract class  call Charge Behaviour.

```python
class Charge_Behaviour(metaclass=abc.ABCMeta):
    """This is the charge behaviour abstract class"""
    @abc.abstractmethod
    def charge(self):
        raise NotImlementError()
```

And then we create different behaviour that is inherited from Charge Behaviour

```python
class Charge_at_Home(Charge_Behaviour):
    def charge(self):
        print("I am charging at home")

class Charge_at_Station(Charge_Behaviour):
    def charge(self):
        print("I am charging my car at the station")

class Cant_Charge(Charge_Behaviour):
    def charge(self):
        print("I can't charge my car")
```

In the Car class, we added some condition for charge behaviour setter which only allow Charge Behaviour Instance.

In addition, we create a charge() function in the Car class which runs the charge_behaviour.charge()

```python
class Car():
    """Base class of all cars"""
    @property
    def charge_behaviour(self):
        return self._charge_behaviour

    @charge_behaviour.setter
    def charge_behaviour(self, value):
        """only allow to set behaviour if it is the instance of Charge_Behaviour
        """
        if(isinstance(value,Charge_Behaviour)):
            self._charge_behaviour = value
        else:
            print("Sorry, the behaviour you selected is not a charge behaviour")

    def charge(self):
        self.charge_behaviour.charge()
```

The children classes are not overriding the parent class's charge(), it create a new instance of Charge Behaviour and assign it to the charge_behaviour property in the constructor:

```python
class Eletric_Car(Car):
    def __init__(self,registration):
        super().__init__(registration)
        self.charge_behaviour = Charge_at_Home()

class Plugin_Hybrid_Car(Car):
    def __init__(self, registration):
        super().__init__(registration)
        self.charge_behaviour = Charge_at_Station()

class Sports_Car(Car):
    def __init__(self, registration):
        super().__init__(registration)
        self.charge_behaviour= Cant_Charge()
```

(Please note that this is not the best practise as we are creating a new instance in constructor, but we will fix this after I finish reading the Book.)

In this way, we can easily switch its charge behaviour at run time, such as:

```python
#PHEV Car
print ("PHEV Car:")
phcar = Plugin_Hybrid_Car("CCC42AC")
#change the behaviour at run time
phcar.charge_behaviour = Cant_Charge()
phcar.charge()
```

### Diagram

![Strategy Pattern](https://raw.githubusercontent.com/hao-hao-hao/DesignPattern/master/StrategyPattern/Class%20Diagram.jpg)

## Key Message To Take Away

Favour composition over inheritance (Has A is better than Is A)
Identify the aspects of vary and separate them from what stays the same.
Program to an interface, not an implementation. (We used different charge hehaviour class to implement the behaviour rather than implementing them in the parent Car class or Children classes)

## Example Code

[Strategy Pattern Example](https://github.com/hao-hao-hao/DesignPattern/tree/master/StrategyPattern)

## Credit

<< Head First Design Patterns >>
