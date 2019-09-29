---
title: "Factory Pattern - Do not depend on concrete implementations"
author: "Sporule"
date: "2019-01-25"
categories: "design pattern"
tags: "factory pattern"
---

## What is Factory Pattern

Factory Pattern removes code dependenices from the concrete objects,which means the caller of the code don't need to worry about the actual implemenation so the caller does not need to change when the underlying is changed.

A very simple example is we order takeaway from a shop, but we don't care how they cook it. It means the shop can change their ingredients or even their chief without impacting all its customers.

## Factory Pattern Implementation

The below scenarios is to unlock your phone by using FaceId or Irirs.

We have phone and the implmentation of the phone:

```python
class Phone():
    def __init__(self,name):
        raise NotImplementedError("You should implement this function")

    def Unlock(self):
        raise NotImplementedError("You should implement this function")

class iPhone(Phone):
    def __init__(self,name):
        self._name = "iPhone X: "+name
        print(self.Name)
 
    def Unlock(self):
        #faceID unlock
        print(self.Name+" Phone is unlocked by face")

    @property
    def Name(self):
        return self._name

class SamsungPhone(Phone):
    def __init__(self,name):
        self._name = "Samsung S8: "+name
        print(self.Name)
    def Unlock(self):
        print(self.Name+" Phone is unlocked by Iris")
    @property
    def Name(self):
        return self._name
```

Normal Implementation: we need to create an instance of the iPhone or Samsung Phone, and then call the function Unlock

```python
#normal implementation, the caller of the function connects to all concreate classes.
iphone = iPhone("MyPhone")
samsung = SamsungPhone("MyPhone")
iphone.Unlock()
samsung.Unlock()

#output
'''
iPhone X: MyPhone
Samsung S8: MyPhone
iPhone X: MyPhone is unlocked by face
Samsung S8: MyPhone Phone is unlocked by Iris
'''
```

Factory Pattern Implementation: We created a phone factory to take the responsibilities of creating phone instance

```python
class PhoneFactory():
    @staticmethod
    def CreatePhone(name):
        if(name=="iphone"):
            return iPhone("From Factory: MyPhone")
        if(name=="samsung"):
            return SamsungPhone("From Factory: MyPhone")
        else:
            return "We dont have the phone you want."
```

Then we call phone factory to get the instance of different phones, by doing this, we remove the dependencies between the caller and the implementation of phones

```python
#factory method, the caller of the function connects to only an abstract factory
factory = PhoneFactory()
iphoneNew = factory.CreatePhone("iphone")
samsungNew = factory.CreatePhone("samsung")
iphoneNew.Unlock()
samsungNew.Unlock()

#output
'''
iPhone X: From Factory: MyPhone
Samsung S8: From Factory: MyPhone
iPhone X: From Factory: MyPhone is unlocked by face
Samsung S8: From Factory: MyPhone Phone is unlocked by Iris
'''
```

### Diagram

The normal implementation is solid black line and the factory pattern is solid red line.

As you can tell from the diagram, Phone factory is the only dependency for the caller in factory pattern. It means caller do not care about phone changes.

In normal Implementation, the caller has a direct connection to other phone implementations, which means any changes in phone implementations will result a change in the caller.

![Factory Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/FactoryPattern/Factory%20Pattern.png)

## Example Code

[Factory Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/FactoryPattern)

## Credit

<< Head First Design Patterns >>
