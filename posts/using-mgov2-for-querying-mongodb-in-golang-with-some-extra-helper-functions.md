---
title: "Using MgoV2 for querying MongoDB in Golang with some extra helper functions"
author: "Sporule"
date: "2018-07-08"
categories: "coding"
tags: "golang,mongodb,odm,hook"
coverimage:"https://hackernoon.com/hn-images/1*WpUuwCQZWhVzP3X0Gibaqw.png"
---

## Introduction

MongoDB is one of the common NOSQL databases to use, however it does not have a stable ODM to support Golang.

It means we need to use the MgoV2 (mongodb driver) to create our own implementation.

## Implementation

### Installation

First of all, we need to install the Mgov2, simply use go get:

```bash
go get gopkg.in/mgo.v2
```

### Integration

To start with, I created a MongoDB strcut to store the session as well as a function to return copied sessions

```go
//MongoDB Type is simply a holder
type MongoDB struct {
	//This original session is not open to public
	session *mgo.Session
	//Session provides a copied session for operations, remember to close it by using defer session.Close()
	Session func() *mgo.Session
}
```

Now we need to build a constructor for the MongoDB to initate the session

```go
import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//NewMongoDB initiates the db session
func NewMongoDB(host, database, username, password string, dropDB bool) (*MongoDB, error) {
	db := &MongoDB{}
	var err error
	//create a new session
	db.session, err = mgo.DialWithInfo(
		&mgo.DialInfo{
			Username: username,
			Password: password,
			Database: database,
			Addrs:    []string{host},
		},
	)
	if err != nil {
		return nil, err
	}
	//set up the Session fucntion to return a copy of the db session
	db.Session = func() *mgo.Session { return db.session.Copy() }

	if dropDB {
		//This is purely for testing purpose, it will drop the database if it is true.
		db.dropDatabase()
	}
	return db, nil
}
```

After having a session, we need to implement some basic functions for MongoDB CRUD opeartions.

```go
//collection provides a copied session as well as its collection, this is a helper function for CRUD
func (db *MongoDB) collection(collection string) (*mgo.Session, *mgo.Collection) {
	s := db.Session()
	c := s.DB(Config.Database).C(collection)
	return s, c
}

//Create provides Insert Operation for Database
func (db *MongoDB) Create(collection string, item interface{}) error {
	//get the session and collection
	s, c := db.collection(collection)
	//close the session after usage
	defer s.Close()
	//run the Insert function
	err := c.Insert(item)
	return err
}


//Get takes in the table name, pointer to the single obejct,
//mongodb query and a hook function to implement the extra query such as select,slice..
//the result will be return to the object pointer
func (db *MongoDB) Get(table string, object, query interface{}, extraQuery func(*mgo.Query) *mgo.Query) error {
	s, c := db.collection(table)
	defer s.Close()
	q := c.Find(query)
	if extraQuery != nil {
		//run queries in the hook if the hook is not empty
		q = extraQuery(q)
	}
	err := q.One(object)
	return err
}

//GetAll takes in the table name, pointer to the obejct array,
//mongodb query and a hook function to implement the extra query such as select,slice..
//the result will be return to the object array pointer
func (db *MongoDB) GetAll(table string, objects, query interface{}, extraQuery func(*mgo.Query) *mgo.Query) error {
	s, c := db.collection(table)
	defer s.Close()
	q := c.Find(query)
	if extraQuery != nil {
		//run queries in the hook if the hook is not empty
		q = extraQuery(q)
	}
	err := q.All(objects)
	return err
}

//Update provides Update Operation for Database
func (db *MongoDB) Update(collection string, query, updatedItem interface{}, UpdateAll bool) error {
	s, c := db.collection(collection)
	defer s.Close()
	var err error
	if UpdateAll {
		_, err = c.UpdateAll(query, bson.M{"$set": updatedItem})
	} else {
		err = c.Update(query, updatedItem)
	}
	return err
}

//Delete provides Delete Operation for Database
func (db *MongoDB) Delete(collection string, query interface{}, RemoveAll bool) error {
	s, c := db.collection(collection)
	defer s.Close()
	var err error
	if RemoveAll {
		_, err = c.RemoveAll(query)
		return err
	}
	err = c.Remove(query)
	return err
}

//DropDatabase drop the database
func (db *MongoDB) dropDatabase() error {
	return db.session.DB(Config.Database).DropDatabase()
}

//Below two functions are for the mongodb aggregate function

//AggGet is the aggregate pipe function for mongo db, it takes an bson.M arrary query and assign one item to object.
func (db *MongoDB) AggGet(table string, object interface{}, queries ...bson.M) error {
	s, c := db.collection(table)
	defer s.Close()
	err := c.Pipe(queries).One(object)
	return err
}

//AggGetAll is the aggregate pipe function for mongo db, it takes an bson.M arrary query and assign an arrary to the objects
func (db *MongoDB) AggGetAll(table string, objects interface{}, queries ...bson.M) error {
	s, c := db.collection(table)
	defer s.Close()
	err := c.Pipe(queries).All(objects)
	return err
}
```

Now we have the CRUD, but we still need to have some fucntion to help simplify the the MongoDB query, so I created below functions. These functions are the implementation of the MongoDB operations that you can find on MongoDB website(The names of the functions matches the name of the operations. For example In is $in).

```go
//QueryHelper is query helper struct for mongo DB, this is purely for better organisations
type QueryHelper struct{}

//MgoQry is a public exposed functions for buildding different querys
var MgoQry QueryHelper

//Bson returns a bson.M key value pair
func (query *QueryHelper) Bson(key string, value interface{}) bson.M {
	return bson.M{key: value}
}

//Bsons returns multiple bson.M key value pairs
func (query *QueryHelper) Bsons(keyValuePairs map[string]interface{}) bson.M {
	qry := bson.M{}
	for key, value := range keyValuePairs {
		qry[key] = value
	}
	return qry
}

//All will match all queies in arrary
func (query *QueryHelper) All(values ...interface{}) bson.M {
	return query.Bson("$all", values)
}

//In will match any queries in arrary
func (query *QueryHelper) In(values ...interface{}) bson.M {
	return query.Bson("$in", values)
}

//Nin will match anything other than the queies in arrary
func (query *QueryHelper) Nin(values ...interface{}) bson.M {
	return query.Bson("$nin", values)
}

//Eq matches equale comparison
func (query *QueryHelper) Eq(value interface{}) bson.M {
	return query.Bson("$eq", value)
}

//Gt matches greater comparison
func (query *QueryHelper) Gt(value interface{}) bson.M {
	return query.Bson("$gt", value)
}

//Gte matches greater or equal comparison
func (query *QueryHelper) Gte(value interface{}) bson.M {
	return query.Bson("$gte", value)
}

//Lt matches less comparison
func (query *QueryHelper) Lt(value interface{}) bson.M {
	return query.Bson("$lt", value)
}

//Lte matches less or equal comparison
func (query *QueryHelper) Lte(value interface{}) bson.M {
	return query.Bson("$lte", value)
}

//And provides and relationship
func (query *QueryHelper) And(queries ...interface{}) bson.M {
	return query.Bson("$and", queries)
}

//Or provides and relationship
func (query *QueryHelper) Or(values ...interface{}) bson.M {
	return query.Bson("$Or", values)
}

//Not provides NOT relationship
func (query *QueryHelper) Not(value interface{}) bson.M {
	return query.Bson("$not", value)
}

//Nor provides NOR relationship
func (query *QueryHelper) Nor(values ...interface{}) bson.M {
	return query.Bson("$nor", values)
}

//Slice sets the item skip and limit of the query
func (query *QueryHelper) Slice(skip, limit int) bson.M {
	return query.Bson("$slice", []int{skip, limit})
}

//Select takes fields name and returns the "filenames":"1" to select the input fields
func (query *QueryHelper) Select(isSelect bool, values ...string) bson.M {
	selector := bson.M{}
	for _, value := range values {
		selector[value] = isSelect
	}
	return selector
}

//Match returns the bson.M for $match operation, this is for aggregation queries only
func (query *QueryHelper) Match(qry interface{}) bson.M {
	return query.Bson("$match", qry)
}

//Limit returns the bson.M for $limit operation, this is for aggregation queries only
func (query *QueryHelper) Limit(maxReturn int) bson.M {
	return query.Bson("$limit", maxReturn)
}

//Sort returns the bson.M for $sort operation, it takes only one fields, this is for aggregation queries only
func (query *QueryHelper) Sort(field string, isDescending bool) bson.M {
	order := 1
	if isDescending {
		// 1 is ascending and -1 is descending
		order = -1
	}
	return query.Bson("$sort", query.Bson(field, order))
}

//Sorts returns the bson.M for $sort operation, it takes multiple key value pairs, this is for aggregation queries only
//Use field name as key and 1/-1 in the value,1 is ascending and -1 is descending
func (query *QueryHelper) Sorts(keyValuePairs map[string]interface{}) bson.M {
	return query.Bson("$sort", query.Bsons(keyValuePairs))
}

//Project returns the bson.M for $project operation which sets the selected fields in SQL, this is for aggregation queries only
func (query *QueryHelper) Project(qry interface{}) bson.M {
	return query.Bson("$project", qry)
}

//LookUp returns the bson.M for $lookup operation, this is for aggregation queries only
func (query *QueryHelper) LookUp(from, localField, foreignField, as string) bson.M {
	qry := make(map[string]interface{})
	qry["from"] = from
	qry["localField"] = localField
	qry["foreignField"] = foreignField
	qry["as"] = as
	return query.Bson("$lookup", query.Bsons(qry))
}
```

How to use in an object call user:

```go
//Some basic structs

//User struct, Roles is an arrary to store the data from Role strcut, it will not
//be saved to the database. The RoleIds will be saved into the database.
//Please ensure the Roles is empty before running insert or update.
type User struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Email       string        `bson:"email,omitempty"`
	Password    string        `bson:"password,omitempty"`
	Name        string        `bson:"name,omitempty"`
	RoleIds     []bson.ObjectId `bson:"roleIds,omitempty"`
	Roles       []Role          `bson:"roles,omitempty"`
}

type Role struct {
	ID   bson.ObjectId `bson:"_id,omitempty"`
	Name string        `bson:"name"`
}

//userCollection is the collection name for Model User in mongo db
const userCollection = "user"

//Resources is the db
var Resources MongoDB

//Get Users by unning a query
func GetUsers() (error) {
    //Initiate the database, the variable Config.XX is a custom strcut that are reading configuration from json file
	Resources, _ = NewMongoDB(Config.Host, Config.Database, Config.Username, Config.Password, Config.DropDB)

	var usersA []User
    var usersB []User

    //build mongo query, it means roles.name that does not contain Admin
	qry := MgoQry.And(MgoQry.Bson("roles.name", MgoQry.Nin("Admin")))


	err := Resources.GetAll(userCollection, &usersA, qry, func(query *mgo.Query) *mgo.Query {
        //This is the implementation of the hook function to select only email field
		return query.Select(MgoQry.Select("email"))
	})
    
    //below is aggregate operation in mongodb

    //filter query
    filter := MgoQry.And(MgoQry.Bson("roles.name", "Admin"))

    //aggregate query will be execute in mongodb in order, see official mongo db document for more information
	err := Resources.AggGetAll(userCollection, &usersB,
        //below are the aggregate queries
		MgoQry.LookUp("role", "roleIds", "_id", "roles"),
		MgoQry.Match(filter),
		MgoQry.Project(common.MgoQry.Select(true, "email", "_id")))

	return err
}
```

Above is the example of using GetAll with hook, you can use the same way to implement Get, Delete, Update etc...