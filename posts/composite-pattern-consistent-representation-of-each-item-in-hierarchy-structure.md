---
title: "Composite Pattern - Consistent Representation of Each Item in Hierarchy Structure"
author: "Sporule"
date: "2019-05-28"
categories: "design pattern"
tags: "composite pattern,python"
---

## What is Composite Pattern

Sometimes we have a requriements that to have a hierarchy design of objects. Such as limitless navigation. Navigation could have individual item and individual item with sub items. Applying composite pattern will make all navigation item in a consistent way not matter if it has children item or not.

## Composite Pattern Implementation

Below is a simple nodes tree structure example.

Starts from a node model, which contains a children nodes array to store all children nodes.

The Print() function will print the node name and exectue all children nodes Print() function.

As you can see, it treat both single node and node with children in the same way.

```python
class Node():
    def __init__(self, name):
        self._name = name
        self._nodes = []
    
    def Add(self,node):
        self._nodes.append(node)
    
    def Get(self,index):
        return self._nodes[index]
    
    def Print(self):
        print(self._name)
        for node in self._nodes:
            node.Print()
```

Then I created few nodes, it then prints the nodes from left to right in a tree structure.(you can see the structure of the nodes in the diagram at the end of this article.)

```python
#create samle nodes
nodeA = Node("A")
nodeA1 = Node("A1")
nodeA2 = Node("A2")
nodeA1a= Node("A1a")
nodeA1b = Node("A1b")
nodeA2a = Node("A2a")
nodeA2b = Node("A2b")

#left nodes
nodeA.Add(nodeA1)
nodeA1.Add(nodeA1a)
nodeA1.Add(nodeA1b)

#RIGHT NODES
nodeA.Add(nodeA2)
nodeA2.Add(nodeA2a)
nodeA2.Add(nodeA2b)


nodeA.Print()
#output
#A
#A1
#A1a
#A1b
#A2
#A2a
#A2b
```

### Diagram

![Composite Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/CompositePattern/CompositePattern.png)

## Example Code

[Composite Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/CompositePattern)

## Credit

<< Head First Design Patterns >>
