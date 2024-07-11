# About

- relational database
- structured schema
- searches via query strings

# Databases

- mysql - used by big 3
- mariaDB - open source version of mysql
- SQLlite - for IoT devices
- PostgreSQL - popular for web dev

# PostgreSQL

These notes are about postgreSQL.

# Version

`psql --version` installed version of postgrsql

# Begin

`pg_ctlcluster 13 main start` starts postgrsql server
`sudo systemctl start postgresql@13-main` use this instead per ubuntu terminal message

Set method to trust in conf file when connecting via a remote terminal since it asked for password.

**Server**

`sudo service postgresql start`
`sudo service postgresql stop`
`sudo service postgresql restart`
`sudo service postgresql status`

**Database**

`psql username=postgres` starts database session
`psql -U postgres` starts database session if above does not work

# View

`\?` list of options
`\h` list of queries
`\l` list of databases
`\d` list of tables

`q` quits list

# CREATE

**Database**

`CREATE DATABASE message_boards;` makes database with given name
`\c message_boards` connects to given database

**Table**

`CREATE TABLE tableName ();` makes a table with given name and passed fields

```sql
CREATE TABLE users (
user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR ( 25 ) UNIQUE NOT NULL,
email VARCHAR ( 50 ) UNIQUE NOT NULL,
full_name VARCHAR ( 100 ) NOT NULL,
last_login TIMESTAMP,
created_on TIMESTAMP NOT NULL 
);
```

```sql
CREATE TABLE boards (
  board_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  board_name VARCHAR (50) UNIQUE NOT NULL,
  board_description TEXT NOT NULL
);
```

```sql
CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  board_id INT REFERENCES boards(board_id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  time TIMESTAMP
);
```

**Data Types**

`INTEGER` integer
`INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY` assigns a unique id to each entry
`VARCHAR (n)` variable characters , n is upper limit
`TEXT` no explicit upper limit
`TIMESTAMP` assigns time

**Insert**

`INSERT INTO someDatabase ();` inserts given data as a record into database

`INSERT INTO users (username,email,full_name,created_on) VALUES ('suki','lol@meow.com','suki purr',NOW());`

# READ

**SELECT**

`SELECT` selects fields to display

**FROM**

`FROM` selects database to search

`SELECT * FROM users;` selects all fields from database users , displays all records
`SELECT * FROM users LIMIT 5;` selects all fields from database users , displays first 5 records

**WHERE**

`WHERE` filters fields

`SELECT username,email FROM users WHERE user_id=5;` displays username and email from database users where the user_id is 5

**AND**

`AND` combines selections

`SELECT username FROM users WHERE last_login IS NULL AND created_on < NOW() - interval '1 month' LIMIT 2;` returns usernames for users who never logged in and account is older than 2 months

**ORDER BY**

`ORDER BY` sorts selections

`SELECT full_name,created_on FROM users ORDER BY created_on;` returns full name sorted by time created in ascending order
`SELECT full_name,created_on FROM users ORDER BY created_on DESC;` returns full name sorted by time created in descending order

**COUNT**

`COUNT()` displays count of given fields

`SELECT COUNT(*) FROM users;` displays count of all users , * means field is not null

**Limit**

Truncate characters.

`LEFT(someField,n)` limits characters by number n , shows n characters from beginning
`RIGHT(someField,n)` limits characters by number n , shows n characters from end

# UPDATE

`UPDATE` updates given database
`SET` updates given field
`RETURNING` displays updated record

`UPDATE users SET last_login=NOW() WHERE user_id=3 RETURNING *;` adds login time to user with id 3 and shows the updated record
`UPDATE users SET last_login=NOW() , full_name='pusheen purr' WHERE user_id=2;` updates login and full name for user with id 2

# DELETE

`DELETE`

`DELETE FROM users WHERE user_id=10;` deletes record with user id 10

`ON DELETE CASCADE` when record is deleted it also deletes all of its associated references
`ON DELETE NO ACTION` does not allow to delete the record until all of its associated references are first deleted
`ON DELETE SET NULL` when record is deleted sets all its associated references to null

# Key

`thisTable REFERENCES otherTable(someKey)` thisTable is the current table record , someKey is the same field in another table

`user_id INT REFERENCES users(user_id)` current table user_id references user_id from users table

# JOIN

Makes a new table based on fields from multiple tables.

**Disambiguate Fields**

If multiple tables have the same field name you can use `.` to disambiguate them.

`tableName.fieldName` specifies fieldname from table tableName

```sql
table1.petName
table2.petName
```

**ON**

Sets the field from one table as equivalent to another table.
This is the common field value that links the tables.
The field names do not have to be identical but it does help to keep them similar for viewing ease.

`ON table1.petName = table2.petName`

# INNER JOIN

Returns field only if both tables have field filled.

`SELECT users.username,comment FROM comments INNER JOIN users ON comments.user_id = users.user_id;`

# LEFT JOIN

Returns all fields from first table and only those from second table that match.

# RIGHT JOIN



# FULL OUTER JOIN

Returns all fields from both tables.

# NATURAL JOIN

Unique to postgresql.

If field names are consistent across different tables , then it assigns keys to all identical field names.

# Nested Queries

- nested query designated by `()`
_ nested query processed first

`SELECT user_id,comment FROM comments WHERE user_id = (SELECT user_id FROM users WHERE full_name = 'pusheen purr');` returns id and comments for user pusheen purr

# GROUP BY

Displays board name and number of comments per board in ascending order.
Uses RIGHT JOIN in order to capture table boards with empty fields.

```sql
SELECT
  boards.board_name,COUNT(comment_id)
AS
  comment_count
FROM
  comments
NATURAL RIGHT JOIN
  boards
GROUP BY
  boards.board_name
ORDER BY
  comment_count ASC;
```

# AS

`AS` names column for selected returned items

# NULL Items

`IS NOT NULL` does not return NULL items

`SELECT user_name FROM users WHERE full_name IS NOT NULL;` returns only usernames with a fullname

# JSON In SQL

This is unique to PostgreSQL.
- native JSON data type
- insert JSON object in a table
- query inserted JSON object

**Table**

Make table and define content as JSON.

```sql
CREATE TABLE rich_content (
  content_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
  content JSON NOT NULL
);
```

**Content**

Insert table content as a JSON object.

```sql
INSERT INTO rich_content
  (comment_id,content)
VALUES
  (20,'{"type":"poll","question":"favourite colour?","options":["red","green","blue"]}'),
  (23,'{"type":"video","url":"https://youtu.be","dimensions":{"height":1080,"width":1920}}'),
  (23,'{"type":"poll","question":"favourite video?","options":["yes","no"]}'),
  (24,'{"type":"img","url":"https://website.com/funny.png","dimensions":{"height":50,"width":50}}');
```

**Query**

`->` returns a JSON object
`->>` returns a string

*Returns All*
`SELECT content -> 'type' AS type_of_content FROM rich_content;` returns "poll" "video" "poll" "img" with column named as type_of_content

*Returns Unique*
`SELECT DISTINCT CAST(content -> 'type' AS TEXT) AS type_of_content FROM rich_content;` returns "poll" "video" "img"
CAST informs SQL that the content is text so that SQL can parse it and remove duplicates.
This works in all SQL not just postgreSQL.

`SELECT content ->> 'type' AS type_of_content FROM rich_content;` returns "poll" "video" "img" since `->>` returns as string

*Nested Queries*

```sql
SELECT
  content -> 'dimensions' ->> 'height' AS height,
  content -> 'dimensions' ->> 'width' AS width
FROM
  rich_content
WHERE
  content -> 'dimensions' IS NOT NULL;
```

# Performance

`EXPLAIN` returns info about query execution

`EXPLAIN SELECT user_id,comment_id,comment FROM comments ORDER BY comment;`

- `cost=n` smaller n is faster performance
- `Seq Scan` least performant
- `Index Scan` most performant

**Make Index**

- computationally expensive to make an index
- make index during down time
- once made queries for given field are faster
- do not make index if not necessary , it may slow performance

`CREATE INDEX ON someTable (someField);` indexes given field

`CREATE UNIQUE INDEX username_idx ON users(username);`

# Users

Make multiple user accounts scoped to only the databases and read write access each requires.
This minimizes the risk of potential errors across multiple databases.
