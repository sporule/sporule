---
title: "Adapter Pattern - Connects two existing components together without touching them"
author: "Sporule"
date: "2019-03-07"
categories: "design pattern"
tags: "adapter pattern,python"
---

## What is Adapter Pattern

Sometimes we want to integrate a vendor solution or a component that is not part of the design. As we can't change the vendors solution, and we don't want to change how our application works. Adapter Pattern is very useful in this scenario, it adds a layer between our solution and the vendors solution. 

## Adapter Pattern Implementation

Below is a simple example of using Remote Control to control a TV.

First we have Remote Control and TV.

```python
class TV():
    def __init__(self,name):
        self._name=name
        
    @property
    def Name(self):
        return self._name
    
    def SwitchOn(self):
        print(self.Name +" is on.")

class RemoteControl():
    def __init__(self,tv):
        self._tv = tv
    
    def SwitchOnTV(self):
        self._tv.On()
```

You can see that the TV has a function SwitchOn(), but the Remote Control is calling the function On().

Now we create a new model that add the function On() in TV, the On() function will call the TV's SwtichOn() function.

```python
class TVAdapter():
    def __init__(self,tv):
        self._tv=tv
    
    def On(self):
        self._tv.SwitchOn()
```

Run a test:

```python
'''without adapter'''
tv = TV("ABC TV")
try:
    control = RemoteControl(tv)
    control.SwitchOnTV() #raise error, AttributeError: 'TV' object has no attribute 'On'
except Exception as ex:
    print(str(ex)) 

'''with adapter'''
#add adapter to connect tv and remote
tv_adapter = TVAdapter(tv)
control = RemoteControl(tv_adapter)
control.SwitchOnTV() #output ABC TV is on.
```

As you can see, without adapter it will throw an error. The adapter connects the TV and Remote together without changing the TV class or Remote class.

### Diagram

![AdapterPattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/AdapterPattern/AdapterPattern.png)

## Example Code

[Adapter Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/AdapterPattern)

## Credit

<< Head First Design Patterns >>
