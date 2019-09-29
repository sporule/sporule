---
title: "Facade Pattern - Decouples the client and the components on top of Adapter Pattern"
author: "Sporule"
date: "2019-03-20"
categories: "design pattern"
tags: "facade pattern,python"
---

## What is Facade Pattern

It is very similar to the adapter pattern, but it simplify the interface for the client. By doing that, it also decouples the client and the components behind the interface.

## Adapter Pattern Implementation

Below is a simple example of using Remote Control to turn on DVD Player and TV for watching movies.

First we have Remote Control, TV and DVD Player

```python
class TV():
    def __init__(self,name):
        self._name=name
        
    @property
    def Name(self):
        return self._name
    
    def SwitchOn(self):
        print(self.Name +" is on.")
        
class DVDPlayer():
    def __init__(self,name):
        self._name=name
        
    @property
    def Name(self):
        return self._name
    
    def Play(self):
        print(self.Name +" is playing.")
        
class RemoteControl():
    def __init__(self,facade):
        self._facade = facade
    
    def WatchMovie(self):
        self._facade.On()
```

You can see that the TV has a function SwitchOn(), DVD Player has the function Play(), but the Remote Control has a function WatchMovie is calling the function On().

Now we create a new TV facade that combines the Play() and SwitchOn(), a fterthat we expose the On() function to the Remote Control

```python
class TVFacade():
    def __init__(self,tv,dvd):
        self._tv=tv
        self._dvd = dvd
    
    def On(self):
        self._tv.SwitchOn()
        self._dvd.Play()
```

Run a test:

```python
from models import RemoteControl
from models import TV
from models import TVFacade
from models import DVDPlayer

'''without adapter'''
tv = TV("ABC TV")
dvd = DVDPlayer("ABC DVD Player")

'''with adapter'''
#add adapter to connect tv and remote
tv_facade = TVFacade(tv,dvd)
control = RemoteControl(tv_facade)
control.WatchMovie() #output ABC TV is on and ABC DVD PLayer is playing
```

As you can see, the remote control can only see the function On(), which simplify the interface that the client can call. In addition, there is no direct connection(loose coupling) between the remote control and the components(DVD Player, TV).

### Diagram

![AdapterPattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/FacadePattern/FacadePattern.png)

## Example Code

[Facade Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/FacadePattern)

## Credit

<< Head First Design Patterns >>
