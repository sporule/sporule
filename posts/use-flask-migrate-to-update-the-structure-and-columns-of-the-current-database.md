---
title: "Use Flask-Migrate to update the Structure and Columns of the Current Database"
author: "Sporule"
date: "2018-09-28"
categories: "coding"
tags: "flask-migrate,database,flask-sqlalchemy,flask,python"
coverimage: "https://i.ytimg.com/vi/BAOfjPuVby0/maxresdefault.jpg"
---

## The Problem

This website(Sporule) is built by using Flask and Flask-SqlAlchemy (an Object Relational Mapping tool) which maps all the model classes to the database.

Any changes in the model class will need the change of the database. Even though it is possible, but it is time consuming.

Flask-Migrate(flask-migrate.readthedocs.io) provided us an easy way to update our database after the changing of model classes, please be aware that you will still need to change the Flask-Migrate generated scripts if the models change is huge (such as database relationship change).

## The Solution

### Step 1
use pip to install Flask-Migrate in your environment or virtual environment
  
### Step 2

Initiate the Flask-Migrate with Flask-SqlAlchemy and the Flask App instance

```python
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate

#create app instance
app = Flask(__name__)

# Create SQLAlchemy instance
db = SQLAlchemy()
db.init_app(app)

#Initiate Flask-Migrate
Migrate(app, db)
```

### Step 3

In terminal, please setup the system environment variable "FLASK_APP" to the startup flask file such as run.py or app.py in your environment or virtual environment

```bash
#setup FLASK_APP environment variable
export FLASK_APP=run.py
```

### Step 4

In the root folder of the Flask app, where the startup flask file is, initiate the flask-migrate which will create a migration folder

```bash
#type below in the terminal
$ flask db init
```

### Step 5

Type below line in the terminal to generate migrate script which will be stored in migrations/versions/ , you can review it to see if it looks OK.

```bash
$ flask db migrate
```

### Step 6

Execute the script to update the database structure

```bash
$ flask db upgrade
```

### Notes

In the future, you just need to repeat step 5 and 6 to update the structure of the database.