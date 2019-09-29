---
title: "Decorator Pattern - Add behaviour to existing functions"
author: "Sporule"
date: "2019-01-13"
categories: "design pattern"
tags: "decorator pattern"
---

## What is Decorator Pattern

Decorator Pattern can change a function without making any changes in the function. It means the changes of the function would not impact any existing code.

## The Problem

A website was built for sharing local news. Now they want to build the API to share content with other developers.

They were thinking adding a new function in the content to output json, but it invovles change of the current tested code.

As a solution, decorator can help them to add output json into the function without changing any existing code.

## Decorator Pattern Implementation

We have an existing tested Content class to output content:

```python
class Content():
    def __init__(self,content):
        self._content = content
    def export_content(self):
        return self._content
```

We will create a Output_type class to output the content in the specific format:

```python
class Output_type():
    @staticmethod
    def to_json(content):
        return "This is json format: "+ content
```

We can wrap the Content.export_content into the Output_type.to_json. In this example, as to_json is genenral to all type of content, so we wrap the output content of Content.export_content. You can wrap a function as well.

```python
from models.content import Content
from models.output_type import Output_type

b = Content("this is fun")
print(b.export_content())
print(Output_type.to_json(b.export_content()))

#output is :
#this is fun
#This is json format: this is fun
```

Above is a very simple example of decorator. Nowadays, most of the modern programming language has a nice way to implement decorators, below is a simple example in python.

We added a wrapper function in Output_type class. *args and **kwargs are the arguments from the pass in function.

```python
class Output_type():
    @staticmethod
    def to_json(content):
        return "This is json format: "+content

    @staticmethod
    def to_json_decorator(func):
        def func_wrapper(*args,**kwargs):
            return "This is decorator format: "+ Output_type.to_json(func(*args,**kwargs))
        return func_wrapper
```

In addition, we added a new function export_content_decorator in the Content class. We can also create this function outside the Content class as it is a simple wrapper of the existing export_content function.

```python
from .output_type import Output_type  

class Content():
    def __init__(self,content):
        self._content = content
    def export_content(self):
        return self._content

    @Output_type.to_json_decorator
    def export_content_decorator(self):
        return self.export_content()
```

As you can see, the export_content_decorater has a decorater @Output_type.to_json_decorator. It bascially perform the same behaviour as our previous general decorator(I have added "This is decorator format:" in the front to seperate them).

```python
from models.content import Content
from models.output_type import Output_type

b = Content("this is fun")
print(b.export_content())
print(Output_type.to_json(b.export_content()))
print(b.export_content_decorator())

#output:
#this is fun
#Output from general decorator: This is json format: this is fun
#Output from Python decorator: This is decorator format: This is json format: this is fun
```

### Diagram (From Wikipedia)

![Decorator Pattern](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Decorator_UML_class_diagram.svg/400px-Decorator_UML_class_diagram.svg.png)

## Key Message To Take Away

Decorator Pattern is very common in the daily usage, such as authentication, content output etc.

The key message to remember is Decorator Pattern is trying to add new function to existing functions without making changes on existing tested code. Also it helps reduce duplication of code. For example we can reuse json output decorator in any string type of content.

## Example Code

[Decorator Pattern](https://github.com/Hao-Luo/DesignPattern/tree/master/DecoratorPattern)

## Credit

<< Head First Design Patterns >>
