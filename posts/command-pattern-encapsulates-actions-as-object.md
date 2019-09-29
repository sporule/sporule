---
title: "Command Pattern - Encapsulates Actions as Object"
author: "Sporule"
date: "2019-02-23"
categories: "design pattern"
tags: "command pattern,queue,python"
---

## What is Command Pattern

Command Pattern packages(encapsualtes) commands(actions) as a objects that can be injected into command runners. These objects will expose a public method( such as Do(), Exec() etc...) for the purpose of triggering the actions. Simple command exectuers could be threads, computers, remote controls etc.. By dong this, the command runner does not need to know what are the commands as they will only execute the command objects' generic public function.

## Command Pattern Implementation

In the example below, we are having one computer to exectue different commands in order. All exectued commands will be print to the screen.

I have a class command as the base class for other commands. This will be an interface for other languages.

```python
class Command():
    def __init__(self,name):
        self._name=name
        
    @property
    def Name(self):
        return self._name
    
    def Do(self):
        raise NotImplementedError("You should implmenet this function")
```

And then I created few commands that inherits from Command

```python
class CleanFilesCommand(Command):    
    def Do(self):
        print("Running - Name: "+self.Name+ " / Command: CleanFilesCommand.")

class PriceCheckCommand(Command):    
    def Do(self):
        print("Running - Name: "+self.Name+ " / Command: PriceCheckCommand.")

class ShoppingCommand(Command):    
    def Do(self):
        print("Running - Name: "+self.Name+ " / Command: ShoppingCommand.")
```

Created An Exectuer class which calls the commands Do()

```python
class Exectuer():
    def __init__(self,name):
        self._name = name
        self._command=None
    
    def SetCommand(self,command):
        self._command = command
    
    def Execute(self):
        print(self._name + ": ")
        if self._command is None:
            print("No command to execute")
            return
        self._command.Do()
```

After that I created a first in first out job queue, all commands are added into the job queue.

```python
#All the commands are First in First Out in a queue
q = queue.Queue()

#add some commands into the queue
q.put(PriceCheckCommand("PriceCheckCommand 1"))
q.put(CleanFilesCommand("CleanFilesCommand 1"))
q.put(PriceCheckCommand("PriceCheckCommand 2"))
q.put(ShoppingCommand("ShoppingCommand 1"))
q.put(CleanFilesCommand("CleanFilesCommand 2"))
Initiate a New Exectuer to run all the commands from the queue

#add an exectuer computer 1
computer1 = Exectuer("Computer 1")
computer1.Execute()

while not q.empty():
    computer1.SetCommand(q.get())
    computer1.Execute()
```

Below is the output, as you can see different commands are exectued by the exectuer in first in first out order

```python
'''output
Computer 1:
No command to execute
Computer 1:
Running - Name: PriceCheckCommand 1 / Command: PriceCheckCommand.
Computer 1:
Running - Name: CleanFilesCommand 1 / Command: CleanFilesCommand.
Computer 1:
Running - Name: PriceCheckCommand 2 / Command: PriceCheckCommand.
Computer 1:
Running - Name: ShoppingCommand 1 / Command: ShoppingCommand.
Computer 1:
Running - Name: CleanFilesCommand 2 / Command: CleanFilesCommand.
'''
```

### Diagram

![Command Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/CommandPattern/CommandPattern.png)

## Example Code:

[Command Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/CommandPattern)

## Credit

<< Head First Design Patterns >>
