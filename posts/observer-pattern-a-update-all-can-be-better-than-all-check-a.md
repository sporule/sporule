---
title: "Observer Pattern - A-Update-All can be better than All-Check-A"
author: "Sporule"
date: "2018-12-27"
categories: "design pattern"
tags: "observer pattern, loose coupling"
---

## What is Observer Pattern

- From the book: The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically.
- From me: The Observer Pattern is trying to resolve the problem of coupling in a "One" to "Many" relationship by handed over the update responsibilities to the "One".

## The Problem

At the beginning of smart phone (Nokia), we don't have push notification for our smart phones. We will need to open the app and then check with the server to see if there are any updates.

As a result, the battery runs out quickly because the manually checking, the server may get overloaded because of the requests.

Nowadays we don't do it any more because of the push services, our phone is notified when we have a new message.

This is the meaning of A-Update-All can be better than All-Check-A.

## Observer Pattern Implementation

For better understanding, I have implemented a extremly simple observer pattern by using the example of newslettter.

The scenario is customer will receive notification when there is a new newsletter.

We create an interface/abstract class for Both newsletter and subscriber, although I don't normally program to interface in a small system.

The newsletter object will have the function to add_subscriber and remove_subscriber

```python
class Newsletter():
    def __init__(self):
        self._subscribers = []

    def add_subscriber(self, subscriber):
        self._subscribers.append(subscriber)

    def remove_subscriber(self,subscriber):
        self._subscribers.remove(subscriber)

    def notify_subscribers(self):
        raise NotImplementedError("You should implement this function")

class Subscriber():
    def __init__(self,name):
        self._name = name

    @property
    def Name(self):
        return self._name
    def get_notification(self,content):
        print(self.Name +': I have just receied '+content+' subscription!.')
```

Then we create the actual class that inheri from its interface, as it is a very simple example so I didn't put any functions or properties for the classes.

```python
from models import Newsletter 
class Fashion_newsletter(Newsletter):
    def notify_subscribers(self,content):
        for subscriber in self._subscribers:
            subscriber.get_notification('new fashion newsletter: '+content)


from models import Subscriber

class Customer(Subscriber):
    def random(self):
        pass

```

As you can tell there is a notify_subscribers function to call the subscriber's get_notification function, this is bascially what Observer Pattern it is.

The implementation of the Observer Pattern is  loose coupling as the Newsletter and Subscriber are indepently of each other.

### Diagram

![Observer Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/ObserverPattern/Class%20Diagram.jpg)

## Key Message To Take Away

> - Observer Pattern is a very common pattern as you can see it in most of the programming languages, such as Events and Delegates.
> - Observer Pattern is mainly for the purpose of loose coupling, one of the benefit is easy to write unit test.
> - A-Update-All can be better than All-Check-A

## Example Code

[Observer Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/ObserverPattern)

## Credit

<< Head First Design Patterns >>
