---
title: "Iterator Pattern - Access the items in aggregate obejcts without knowing the underlying of the objects"
author: "Sporule"
date: "2019-05-08"
categories: "design pattern"
tags: "iterator pattern,python"
---

## What is Iterator Pattern

Iterator pattern provides a consistent interface to different aggregate objects such as list, dictionary etc. It disconnect the user of the iterator interface and its underlying objects.

For example the user of the iterator interface does not need to worry about the underlying objects is dict or array etc.

## Iterator Pattern Implementation

Below example is showing calling the iterator for an array and requests from database.

Firstly, we need to have a iterator interface. This interface needs to implment a logic on how to iterate the items.

I have created a very simple one with HasNext() and Next() for using in while loop.

```python
class Iterator():
    def __init__(self,name):
        self._name=name
        
    def HasNext(self):
        raise NotImplementedError
    
    def Next(self):
        raise NotImplementedError
```

Then I created two classes, one is student and the other is teacher. They both have a function call GetIterator(), it turns objects into Concrete iterator which I will explain below.

The teacher model is very basic without any special settings

```python
class Teacher():
    def __init__(self,name):
        self._name=name
    
    @property
    def Name(self):
        return self._name
    
    @staticmethod
    def GetIterator(teachers):
        #teachers is the teacher array
        return TeacherIterator(teachers)
```

I added a Mock Database class to simulate getting students object from the database.

I also added a function GetStudentById() in student class to simulate getting specific student by using the id from the Mock Database.

You don't need to focus on the details about mocking database and get students from the mock database, the whole purpose of doing that is trying to show a object that does not contain out of box iterator. It is not a good practise to use iterator in database in this way.

```python
class Student():
    def __init__(self,name):
        self._name=name
    
    @property
    def Name(self):
        return self._name
    
    @staticmethod
    def GetIterator(student_ids):
        return StudentIterator(student_ids)
    
    @staticmethod
    def GetStudentById(id):
        #this is a mock of getting student from database
        return DBMock.GetStudent("Students",id)

class DBMock():
    """This is the mock database"""
    def __init__(self):
        self._db = ""
    
    @staticmethod
    def GetStudent(collection,id):
        return Student(collection+" "+str(id))
```

Now we need to implement the Concrete Iterator TeacherIterator and StudentIterator. These are inherit from iterator. This is the iterator object that will return for GetIterator()

These Concrete iterators has its own implementation of HasNext() or Next(), it is very similar as the adapter pattern.

```python
class TeacherIterator(Iterator):
    #teachers are the teacher dict
    def __init__(self,teachers):
        self._teachers=teachers
        self._position=-1
        
    def HasNext(self):
        if len(self._teachers)<=self._position+1:
            return False
        else:
            return True
    
    def Next(self):
        self._position+=1
        return self._teachers[self._position]

class StudentIterator(Iterator):
    #student_ids are the student ids array
    def __init__(self,student_ids):
        self._student_ids=student_ids
        self._position=-1
        
    def HasNext(self):
        if len(self._student_ids)<=self._position+1:
            return False
        else:
            return True
    
    def Next(self):
        self._position+=1
        return Student.GetStudentById(self._student_ids[self._position])
```

Now we run a test so you can see PrintAllNames() prints all the objects correctly without knowing the underlying format of the obejcts. The format means it does not know if it is array or dictionary or other etc..

```python
class Helper():
    def __init__(self):
        pass
    @staticmethod
    def PrintAllNames(iterators):
        while iterators.HasNext():
            item = iterators.Next()
            print("The name is "+item.Name)

student_ids = [3,5,1,9,8]
teachers = [Teacher("teacher a"),Teacher("teacher b"),Teacher("teacher c"),Teacher("teacher d"),Teacher("teacher e")]

#This is the student iterator to iterate the database
studentsIterator = Student.GetIterator(student_ids)
#This is the teach iterator to iterate the teachers object itself
teachersIterator = Teacher.GetIterator(teachers)


Helper.PrintAllNames(studentsIterator)
#outputs:
#The name is Students 5
#The name is Students 3
#The name is Students 1
#The name is Students 9
#The name is Students 8

Helper.PrintAllNames(teachersIterator)
#outputs:
#The name is teacher a
#The name is teacher b
#The name is teacher c
#The name is teacher d
#The name is teacher e
```

### Diagram

I didn't show the teacher model and student model in the diagram as that is not important.

![Iterator Pattern](https://raw.githubusercontent.com/Hao-Luo/DesignPattern/master/IteratorPattern/IteratorPattern.png)

## Example Code

[Iterator Pattern Example](https://github.com/Hao-Luo/DesignPattern/tree/master/IteratorPattern)

## Credit

<< Head First Design Patterns >>
