---
title: "State Pattern - Control the behaviours by using States"
author: "Sporule"
date: "2019-06-13"
categories: "design pattern"
tags: "state pattern,python"
---

## What is States Pattern

States pattern set a state to a object, then the object will have different behaviours in different states.

State Pattern Implementation:
Below is a simple TV on and off example.

The TV contains two state, stateOn and stateOff

The TV can't be turn on when the state is stateOn, and the TV can't be turn off when the state is stateOff.

We start from a State interface, StateOn and StateOff

```python
class State():
    
    @staticmethod
    def SwitchOn():
        raise NotImplementedError
    @staticmethod
    def SwitchOff():
        raise NotImplementedError

class StateOn(State):
    
    @staticmethod
    def SwitchOn():
        print("You can't switch on again as it is already On")
    @staticmethod
    def SwitchOff():
        print("It is switched off")

class StateOff(State):
    @staticmethod
    def SwitchOn():
        print("It is switched on")
    @staticmethod
    def SwitchOff():
        print("You can't switch off as it is already off")
```

Then I created a TV object that takes name, stateOn and stateOff in constructor.

It also has two functions which is SwitchOn and Switch Off

```python
class TV():
    def __init__(self,name,stateOn,stateOff):
        self._name=name
        self._stateOn=stateOn
        self._stateOff=stateOff
        self._state = self._stateOff
    
    def SwitchOn(self):
        self._state.SwitchOn()
        self._state=self._stateOn
    
    def SwitchOff(self):
        self._state.SwitchOff()
        self._state=self._stateOff
```

### Diagram

![State Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/StatePattern/StatePattern.png)

## Example Code

[State Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/StatePattern)

## Credit

<< Head First Design Patterns >>
