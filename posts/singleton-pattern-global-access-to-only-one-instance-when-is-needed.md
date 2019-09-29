---
title: "Singleton Pattern - Global Access to only One Instance when is needed"
author: "Sporule"
date: "2019-02-23"
categories: "design pattern"
tags: "singleton pattern"
---

## What is Singleton Pattern

Singleton Pattern is making sure that only one instance of the class can be created. Normally it is to make sure the data integrity. For example if you have two connections that connects to the database at the same time, then it may raise the conflict. Another example will be Caching, ideally we should only have 1 Cache for the system unless we have a valid reason to do it.

Singleton and Global Variable is very differnt, the main difference I found is Singleton is a lazy loading of Global variables. Global variables needs to be initated when starting the application, but Singleton will be initiated in the first usage.

## Singleton Pattern Implementation

Below is a simple example of Cache Implementation.

Please do not use the below implmenetation for production in python, please use metaclass to implement Singleton in Python.

The reason that I came up with this implementation is to show an implementation that could apply to other languages.

We only have 1 class here which is Cache:

```python
class Cache():
    _instance = None
    content = ""

    @staticmethod
    def GetInstance():
        if Cache._instance is None:
            Cache._instance = Cache()
        return Cache._instance
        
    def Add(self,content):
        #Assign Value to the content
        self.content = content
        print(self.content + " is added to the cache")
    
    def Get(self):
        #Print the content
        print("The content is: "+self.content)
```

In Python there is no static class concept, the class itself is kind of an instance, so I have put below test code to run:

```python
from models import Cache

#create normal instance
cache_a = Cache()
cache_a.Add("Hello")

#Singleton
cache_s1 = Cache.GetInstance()
cache_s1.Add("This is Cache S1")

#Create another instance to check if this is the same instance as s1
cache_s2 = Cache.GetInstance()

#Testing the instance
cache_a.Get()
#output The content is: Hello
cache_s1.Get()
#output The content is: This is Cache S1
cache_s2.Get()
#output The content is: This is Cache S1
```

As you can see here, cache_a is a new instance of the Cache which it is own its own. So it prints "Hello" which is different compare to cache_s1 and cache_s2.

cache_s1 and cache_s2 are using the same instance, so they both print "thi is cache s1".

### Diagram

There is no class diagram for Singleton as there is only one class. I have attached a kind of "process" diagram

![Singleton Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/SingletonPattern/SingletonPattern.png)

## Example Code
  
[Singleton Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/SingletonPattern)

## Credit

<< Head First Design Patterns >>
