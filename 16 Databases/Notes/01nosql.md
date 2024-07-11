# About

- non relational database
- non structural schema
- document based
- searches via JSON query objects

# Databases

- mongoDB
- rethinkDB

# MongoDB

These notes are for the mongo db.

# Begin

Mongo Server
`sudo systemctl start mongod` start
`sudo systemctl status mongod` status
`sudo systemctl stop mongod` stop
`sudo systemctl restart mongod` restart

Mongo
`mongo` begin mongo session

# Help

`db.help` shows available functions

# View

`show dbs;` displays databases
`db.pets.count()` returns # of records in collection pets
`db.stats()`

# CREATE

**Database**

`use petstore` makes database called petstore and switches to it

**Collection**

`db.someCollection` db is database currently in , adds given collection to it

**Insert**

`.insertOne()` adds given record
`.insertMany()` adds given records
`.insert()` adds either one or many records

`db.pets.insertOne({name:"suki",type:"cat",colour:"calico",age:3})` inserts record
`db.pets.insertMany()` inserts given records

makes many records based on given array , and assigns each record an index
```js
db.pets.insertMany(
    Array.from({length:100}).map((_,index) => ({
        name: ["fluffy","hello kitty","pusheen","jennifer","karen","amber","jane","silly","sky","sea","fire"][index % 9],
        type: ["cat","dog","bird","person"][index % 4],
        age: (index % 18) + 1,
        colour: ["calico","gray","mixed"][index % 3],
        index: index,
    }))
);
```

# READ

**Find**

`.findOne()`
`.findMany()`
`.find()`

`.limit(n)` limits returned records to given n
`.toArray()` returns records as an object shape

`db.pets.findOne()` returns first record
`db.pets.find({type:"cat",age:"2"})` returns all matched records
`db.pets.find({type:"cat",age:"2"}).limit(10)` returns 10 matched records
`db.pets.find({type:"cat",age:"2"}).limit(10).toArray()` returns 10 matched records in array format

**Query Operators**

`{$gt: }` greater than
`{$lt: }` less than
`{$eq: }` equal to
`{$ne: }` not equal to

`db.pets.count({type:"cat",age:{$gt:10}})` returns count of senior cats

**Logical Operators**

`$and:[]`
`$or:[]`
`$nor:[]`
`$not:[]`

`db.pets.count({type:"cat", $and: [{age:{$gte:1}},{age:{$lte:3}}]})` returns number of cats between age 1 and 3

**Sort**

`sort({something:1})` ascending order
`sort({something:-1})` descending order

`db.pets.find({type:"cat"}).sort({age:1}).limit(4)` returns 4 cats in ascending age order
`db.pets.find({type:"cat"}).sort({age:1,colour:1}).limit(4)` sorts by age and colour

**Projections**

`({property1:value1},{property2:true})` returns only property2 value for each matched property1 value
`({property1:value1},{property2:true,_id:false})` same as above but excludes object id

`db.pets.find({type:"cat"},{name:1}).limit(5)` returns names of first 5 cats
`db.pets.find({type:"cat"},{name:1,_id:0}).limit(5)` returns names of first 5 cats without their ids

# UPDATE

**Fields**

`$set{}` sets the value of given field , adds field if not already there
`$unset{}` removes given field
`$rename{}` renames given field
`$inc{}` increments value of given field


`.updateOne({},{$set{}})` first parameter is for query , second parameter is for update of field in one record
`.updateMany()`

`db.pets.updateOne({type:"bird",name:"fluffy"},{$set:{owner:"Hello Kitty"}});` added owner to one record of a bird named fluffy
`db.pets.updateMany({type:"person"},{$inc:{age:1}});` increment all persons age by 1

**Upsert**

`,{upsert: true}` updates a record but if it is not found it creates the record and inserts it into the database

must add all fields in order for record to be updated
```js
db.pets.updateOne({type:"bird",name:"Teradactl"},{$set:{type:"bird",name:"Teradactl",age:2000000000,colour:"green",index:1000,owner:"me"},},{upsert:true});
```

# DELETE

`.deleteOne()` deletes given record
`.deleteMany()` deletes given records

`db.pets.deleteMany({type:"dog",colour:"calico"})` deletes all calico dogs from the database

`.findOneAndDelete()` displays found record then deletes it

# Index

**View Query Performance**

`.explain("executionStats")` returns info about how it executed the query

- `"winningPlan" "stage" "COLLSCAN"` means every item was searched , least performant
- `"winningPlan" "stage" "FETCH"` means field index was used , better performance
- `"executionStats" "totalDocsExamined"` how many records where searched

`db.pets.find({name:"fluffy"}).explain("executionStats")`

**Make Index**

`.createIndex({})` makes index memory tree , do not use this on very large datasets , can bring down server

`db.pets.createIndex({name:1})` makes an index based on name
`db.pets.createIndex({petID:1},{unique:true})` makes an index based on petID and sets each petID value to unique so that duplicate values are not allowed

**Make Text Search Index**

`db.pets.createIndex({type:"text",colour:"text"})` makes index based on inputed text

`db.pets.find({$text:{$search:"bird calico"}}).sort({score:{$meta:"textScore"}})` returns list of calico bird matches sorted by best match

**Show Indexes**

`.getIndexes()` shows index key value pairs

`db.pets.getIndexes`

# Aggregate

Group data and perform functions on groups.

`$bucket: {}` 
`$match: {}` 
`$sort: {}` 
`$sample: {}` 

**One Stage**

Returns count of all pets grouped by age.
```js
db.pets.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0,3,9,15],
      default: "senior",
      output: {
        count: {$sum:1},
      },
    },
  },
]);
```

**Two Stages**

Returns counts of cats grouped by age.
```js
db.pets.aggregate([
  {  // stage 1
    $match: {
      type: "cat",
    },
  },
  {  // stage 2
    $bucket: {
      groupBy: "$age",
      boundaries: [0,3,9,15],
      default: "senior",
      output: {
        count: {$sum:1},
      },
    },
  },
]);
```

**Multiple Stages**

Returns counts in descending order of cats grouped by age
```js
db.pets.aggregate([
  {  // stage 1
    $match: {
      type: "cat",
    },
  },
  {  // stage 2
    $bucket: {
      groupBy: "$age",
      boundaries: [0,3,9,15],
      default: "senior",
      output: {
        count: {$sum:1},
      },
    },
  },
  {  // stage 3
    $sort: {
      count: -1,
    },
  },
]);
```
